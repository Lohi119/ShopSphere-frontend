import {
  Container,
  Typography,
  Button,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        mt: 8,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ mb: 3 }}
      >
        Order Placed Successfully! 🎉
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Thank you for your purchase.
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4 }}
      >
        Your Order ID is:
        <strong> #{id}</strong>
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{ mr: 2 }}
      >
        Continue Shopping
      </Button>

      <Button
        variant="outlined"
        onClick={() => navigate("/orders")}
      >
        View My Orders
      </Button>
    </Container>
  );
}

export default OrderSuccess;