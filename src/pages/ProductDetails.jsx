import {
  Container,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";
import { getProducts } from "../api/productApi";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProducts();

       const foundProduct = data.find(
  (item) => String(item.id) === String(id)
);

        setProduct(foundProduct);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading product...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {product.name}
      </Typography>

      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{
          maxWidth: 400,
          mb: 2,
        }}
      />

      <Typography variant="h5" sx={{ mb: 2 }}>
        ₹{Number(product.price).toLocaleString("en-IN")}
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {product.description}
      </Typography>

      <Button
        variant="contained"
        onClick={() => addToCart(product)}
        sx={{ mr: 2 }}
      >
        Add to Cart
      </Button>

      <Button
        variant="outlined"
        onClick={() => addToWishlist(product)}
      >
        Add to Wishlist
      </Button>
    </Container>
  );
}

export default ProductDetails;
