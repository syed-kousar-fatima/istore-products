import { useCallback, useMemo } from "react";
import { useCart as useCartContext } from "../context/CartContext";

const useCart = () => {
  const context = useCartContext();

  const isEmpty = context.cart.length === 0;

  const hasItem = useCallback(
    (productId, options = {}) => {
      return Boolean(context.getCartItem(productId, options));
    },
    [context]
  );

  const getItemQuantity = useCallback(
    (productId, options = {}) => {
      return context.getCartItem(productId, options)?.quantity || 0;
    },
    [context]
  );

  const addProduct = useCallback(
    (product, options = {}) => {
      context.addToCart(product, options);
    },
    [context]
  );

  const increaseProduct = useCallback(
    (productId, options = {}) => {
      context.increaseQuantity(productId, options);
    },
    [context]
  );

  const decreaseProduct = useCallback(
    (productId, options = {}) => {
      context.decreaseQuantity(productId, options);
    },
    [context]
  );

  const removeProduct = useCallback(
    (productId, options = {}) => {
      context.removeFromCart(productId, options);
    },
    [context]
  );

  const summary = useMemo(
    () => ({
      itemCount: context.cartCount,
      subtotal: context.cartSubtotal,
      shipping: context.shipping,
      tax: context.tax,
      total: context.cartTotal,
    }),
    [
      context.cartCount,
      context.cartSubtotal,
      context.shipping,
      context.tax,
      context.cartTotal,
    ]
  );

  return {
    ...context,
    isEmpty,
    hasItem,
    getItemQuantity,
    addProduct,
    increaseProduct,
    decreaseProduct,
    removeProduct,
    summary,
  };
};

export default useCart;
export { useCart };