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
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

function MyOrders() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user || !user.id) {
          setError("Please login to view your orders.");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:8081/api/orders/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load orders");
        }

        const data = await response.json();

        console.log("Orders received:", data);

        setOrders(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <Container sx={{ mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        My Orders
      </Typography>

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {!error && orders.length === 0 && (
        <Alert severity="info">
          You have not placed any orders yet.
        </Alert>
      )}

      {!error &&
        orders.map((order) => (
          <Card
            key={order.id}
            sx={{ mb: 3 }}
          >
            <CardContent>

              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                Order #{order.id}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Status: <strong>{order.status}</strong>
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Total Amount: ₹{order.totalAmount}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                Items
              </Typography>

              {order.orderItems &&
                order.orderItems.map((item) => (
                  <Box
                    key={item.id}
                    sx={{ mb: 1 }}
                  >
                    <Typography>
                      {item.product?.name || "Product"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Quantity: {item.quantity} | Price: ₹
                      {item.price}
                    </Typography>
                  </Box>
                ))}

              {/* VIEW DETAILS */}
              <Button
                variant="contained"
                onClick={() =>
                  navigate(`/orders/${order.id}`)
                }
                sx={{ mt: 2 }}
              >
                View Details
              </Button>

            </CardContent>
          </Card>
        ))}
    </Container>
  );
}

export default MyOrders;