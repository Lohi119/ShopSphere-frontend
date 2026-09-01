import {
  AppBar,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          ShopSphere
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/"
        >
          Home
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/products"
        >
          Products
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/cart"
        >
          Cart
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/wishlist"
        >
          Wishlist
        </Button>

        {user ? (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/my-orders"
            >
              My Orders
            </Button>

            <Typography
              sx={{
                mx: 2,
                fontSize: "0.9rem",
              }}
            >
              Hi, {user.name}
            </Typography>

            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Login
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;