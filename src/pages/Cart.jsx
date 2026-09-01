import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price) * product.quantity,
    0
  );

  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cart.map((product) => (
            <Card
              key={product._id}
              sx={{
                display: "flex",
                mb: 2,
                p: 2,
              }}
            >
              {product.image && (
                <CardMedia
                  component="img"
                  sx={{
                    width: 150,
                    height: 120,
                    objectFit: "cover",
                  }}
                  image={product.image}
                  alt={product.name}
                />
              )}

              <CardContent>
                <Typography variant="h6">
                  {product.name}
                </Typography>

                <Typography>
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Quantity: {product.quantity}
                </Typography>

                <div style={{ marginTop: "10px" }}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      decreaseQuantity(product._id)
                    }
                  >
                    −
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() =>
                      increaseQuantity(product._id)
                    }
                    sx={{ ml: 1 }}
                  >
                    +
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      removeFromCart(product._id)
                    }
                    sx={{ ml: 1 }}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Typography variant="h5" sx={{ mt: 3 }}>
            Total: ₹{total.toLocaleString("en-IN")}
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;