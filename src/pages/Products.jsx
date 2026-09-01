import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log("PRODUCT API DATA:", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected an array but received:", data);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products Page
      </Typography>

      {products.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 3 }}>
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.id || product._id}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Products;