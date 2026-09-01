import { createContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    const addToWishlist = (product) => {
        setWishlist((currentWishlist) => {
            const exists = currentWishlist.some(
                (item) => item.name === product.name
            );

            if (exists) {
                return currentWishlist;
            }

            return [...currentWishlist, product];
        });
    };

    const removeFromWishlist = (productName) => {
        setWishlist((currentWishlist) =>
            currentWishlist.filter(
                (product) => product.name !== productName
            )
        );
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistContext;