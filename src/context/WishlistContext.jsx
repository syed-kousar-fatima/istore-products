import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "iStore-wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(wishlist)
      );
    } catch {
      return;
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    if (!product || product.id === undefined || product.id === null) {
      return;
    }

    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => String(item.id) === String(product.id)
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => String(item.id) !== String(product.id)
        );
      }

      return [
        ...currentWishlist,
        {
          ...product,
          quantity: product.quantity || 1,
        },
      ];
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) => String(item.id) === String(productId)
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = wishlist.length;

  const value = {
    wishlist,
    wishlistCount,
    toggleWishlist,
    isWishlisted,
    removeFromWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};

export default WishlistContext;