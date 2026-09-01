import {
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price) * product.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setError("");

    // Check login
    if (!user || !user.id) {
      setError("Please login before placing the order.");
      return;
    }

    // Check cart
    if (!cart || cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Get JWT token
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Login session expired. Please login again.");
      return;
    }

    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        userId: user.id,

        items: cart.map((product) => ({
          productId: product.id || product._id,
          quantity: product.quantity,
        })),
      };

      console.log("ORDER DATA:", orderData);

      const response = await fetch(
        "http://localhost:8081/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      console.log("ORDER RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order"
        );
      }

      console.log(
        "Order created successfully:",
        data
      );

      // Clear cart
      clearCart();

      // Go to order success page
      navigate(`/order-success/${data.id}`);

    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      setError(
        error.message ||
          "Unable to place order. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Checkout
      </Typography>

      <Typography variant="h6">
        Order Total: ₹
        {total.toLocaleString("en-IN")}
      </Typography>

      {error && (
        <Typography
          color="error"
          sx={{ mt: 2 }}
        >
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handlePlaceOrder}
        disabled={
          loading ||
          cart.length === 0
        }
      >
        {loading ? (
          <CircularProgress
            size={24}
            color="inherit"
          />
        ) : (
          "Place Order"
        )}
      </Button>

    </Container>
  );
}

export default Checkout;