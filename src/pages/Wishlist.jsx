import {
    Container,
    Typography,
    Button,
} from "@mui/material";
import { useContext } from "react";
import WishlistContext from "../context/WishlistContext";

function Wishlist() {
    const {
        wishlist,
        removeFromWishlist,
    } = useContext(WishlistContext);

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Wishlist
            </Typography>

            {wishlist.length === 0 ? (
                <Typography>
                    Your wishlist is empty.
                </Typography>
            ) : (
                wishlist.map((product) => (
                    <div
                        key={product.name}
                        style={{ marginBottom: "25px" }}
                    >
                        <Typography variant="h6">
                            {product.name}
                        </Typography>

                        <Typography>
                            {product.price}
                        </Typography>

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() =>
                                removeFromWishlist(product.name)
                            }
                            sx={{ mt: 1 }}
                        >
                            Remove
                        </Button>
                    </div>
                ))
            )}
        </Container>
    );
}

export default Wishlist;