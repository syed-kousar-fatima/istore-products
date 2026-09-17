// context/CartContext.jsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const getStoredCart = () => {
  try {
    const stored = localStorage.getItem("iStore-cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const normalizeItem = (product, options = {}) => ({
  id: product.id,
  name: product.name,
  category: product.category || "",
  price: Number(product.price) || 0,
  image: product.image || "",
  color: options.color || product.color || product.colors?.[0]?.value || "",
  colorName: options.colorName || product.colorName || product.colors?.[0]?.name || "",
  storage: options.storage || product.storage || product.storageOptions?.[0] || "",
  quantity: Math.max(1, Number(options.quantity) || 1),
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("iStore-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product, options = {}) => {
    const item = normalizeItem(product, options);

    setCart((current) => {
      const existingIndex = current.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.storage === item.storage
      );

      if (existingIndex === -1) {
        return [...current, item];
      }

      return current.map((cartItem, index) =>
        index === existingIndex
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
    });

    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id, options = {}) => {
    setCart((current) =>
      current.filter(
        (item) =>
          !(
            item.id === id &&
            (!options.color || item.color === options.color) &&
            (!options.storage || item.storage === options.storage)
          )
      )
    );
  }, []);

  const updateQuantity = useCallback((id, quantity, options = {}) => {
    const nextQuantity = Math.max(0, Number(quantity) || 0);

    setCart((current) => {
      if (nextQuantity === 0) {
        return current.filter(
          (item) =>
            !(
              item.id === id &&
              (!options.color || item.color === options.color) &&
              (!options.storage || item.storage === options.storage)
            )
        );
      }

      return current.map((item) =>
        item.id === id &&
        (!options.color || item.color === options.color) &&
        (!options.storage || item.storage === options.storage)
          ? { ...item, quantity: nextQuantity }
          : item
      );
    });
  }, []);

  const increaseQuantity = useCallback((id, options = {}) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id &&
        (!options.color || item.color === options.color) &&
        (!options.storage || item.storage === options.storage)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((id, options = {}) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id &&
          (!options.color || item.color === options.color) &&
          (!options.storage || item.storage === options.storage)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartItem = useCallback(
    (id, options = {}) =>
      cart.find(
        (item) =>
          item.id === id &&
          (!options.color || item.color === options.color) &&
          (!options.storage || item.storage === options.storage)
      ),
    [cart]
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((value) => !value), []);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const shipping = cartSubtotal > 0 ? 0 : 0;
  const tax = cartSubtotal * 0.08;
  const cartTotal = cartSubtotal + shipping + tax;

  const value = useMemo(
    () => ({
      cart,
      setCart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartItem,
      openCart,
      closeCart,
      toggleCart,
      cartCount,
      cartSubtotal,
      shipping,
      tax,
      cartTotal,
    }),
    [
      cart,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartItem,
      openCart,
      closeCart,
      toggleCart,
      cartCount,
      cartSubtotal,
      tax,
      cartTotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};

export default CartContext;