import {
  Container,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Box,
  Divider,
  Button,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AuthContext from "../context/AuthContext";

function OrderDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        if (!user) {
          setError("Please login to view this order.");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8081/api/orders/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load order details.");
        }

        const data = await response.json();

        console.log("Order details:", data);

        // Security check on frontend:
        // Make sure this order belongs to logged-in user
        if (data.userId !== user.id) {
          throw new Error(
            "You are not authorized to view this order."
          );
        }

        setOrder(data);
      } catch (error) {
        console.error("Order details error:", error);
        setError(
          error.message || "Failed to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user]);

  if (loading) {
    return (
      <Container sx={{ mt: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">
          {error}
        </Alert>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/my-orders")}
        >
          Back to My Orders
        </Button>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="info">
          Order not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 5 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        Order Details
      </Typography>

      <Card>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold" }}
          >
            Order #{order.id}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Status:{" "}
            <strong>{order.status}</strong>
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Total Amount: ₹
            {order.totalAmount}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Ordered Items
          </Typography>

          {order.orderItems &&
          order.orderItems.length > 0 ? (
            order.orderItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.product?.name ||
                    "Product"}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Quantity: {item.quantity}
                </Typography>

                <Typography>
                  Price: ₹{item.price}
                </Typography>

                <Typography>
                  Subtotal: ₹
                  {item.price * item.quantity}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>
              No items found for this order.
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            Total: ₹{order.totalAmount}
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate("/my-orders")}
          >
            Back to My Orders
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default OrderDetails;