import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ShopSphere
                </Typography>

                <Button
                    variant="contained"
                    component={Link}
                    to="/"
                >
                    Home
                </Button>

                <Button
                    variant="contained"
                    component={Link}
                    to="/products"
                >
                    Products
                </Button>

                <Button
                    variant="contained"
                    component={Link}
                    to="/cart"
                >
                    Cart
                </Button>

                <Button
                    variant="contained"
                    component={Link}
                    to="/wishlist"
                >
                    Wishlist
                </Button>

                <Button
                    variant="contained"
                    component={Link}
                    to="/login"
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;