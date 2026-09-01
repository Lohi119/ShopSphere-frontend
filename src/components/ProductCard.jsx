import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import WishlistContext from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />

      <CardContent>
        <Typography variant="h6">
          {product.name}
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          ₹{product.price}
        </Typography>

        <Button
          variant="contained"
onClick={() => {
  console.log("ADD TO CART CLICKED:", product);
  addToCart(product);
}}          sx={{ mr: 1 }}
        >
          Add to Cart
        </Button>

        <Button
          variant="outlined"
          onClick={() => addToWishlist(product)}
          sx={{ mr: 1 }}
        >
          Wishlist
        </Button>

        <Button
  variant="text"
  onClick={() =>
    navigate(`/product/${product.id}`)
  }
>
  View Details
</Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
