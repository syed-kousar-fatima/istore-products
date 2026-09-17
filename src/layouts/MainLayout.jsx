import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useOrder } from "../hooks/useOrder";

const MainLayout = () => {
  const location = useLocation();

  const cartData = useCart();
  const wishlistData = useWishlist();
  const orderData = useOrder();

  const cart = cartData.cart || [];
  const wishlist = wishlistData.wishlist || [];
  const orders = orderData.orders || [];

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + (Number(item.quantity) || 1);
    }, 0);
  }, [cart]);

  const wishlistCount = useMemo(() => {
    return wishlist.length;
  }, [wishlist]);

  const onAddToCart = (product) => {
    if (!product) return;

    if (typeof cartData.addToCart === "function") {
      cartData.addToCart(product);
    }
  };

  const onIncrease = (id) => {
    if (typeof cartData.increaseQuantity === "function") {
      cartData.increaseQuantity(id);
    }
  };

  const onDecrease = (id) => {
    if (typeof cartData.decreaseQuantity === "function") {
      cartData.decreaseQuantity(id);
    }
  };

  const onRemove = (id) => {
    if (typeof cartData.removeFromCart === "function") {
      cartData.removeFromCart(id);
    }
  };

  const onClearCart = () => {
    if (typeof cartData.clearCart === "function") {
      cartData.clearCart();
    }
  };

  const onToggleWishlist = (product) => {
    if (!product) return;

    if (typeof wishlistData.toggleWishlist === "function") {
      wishlistData.toggleWishlist(product);
    }
  };

  const isWishlisted = (productId) => {
    if (typeof wishlistData.isWishlisted === "function") {
      return wishlistData.isWishlisted(productId);
    }

    return wishlist.some((item) => item.id === productId);
  };

  const onRemoveFromWishlist = (productId) => {
    if (typeof wishlistData.removeFromWishlist === "function") {
      wishlistData.removeFromWishlist(productId);
    } else if (typeof wishlistData.toggleWishlist === "function") {
      const product = wishlist.find((item) => item.id === productId);

      if (product) {
        wishlistData.toggleWishlist(product);
      }
    }
  };

  const onClearWishlist = () => {
    if (typeof wishlistData.clearWishlist === "function") {
      wishlistData.clearWishlist();
    }
  };

  const onPlaceOrder = (order) => {
    if (!order) return null;

    if (typeof orderData.placeOrder === "function") {
      return orderData.placeOrder(order);
    }

    return order;
  };

  const onTrackOrder = (orderId) => {
    if (typeof orderData.trackOrder === "function") {
      return orderData.trackOrder(orderId);
    }

    return orders.find(
      (order) =>
        order.id === orderId ||
        order.orderId === orderId
    );
  };

  const hideFooter =
    location.pathname === "/checkout" ||
    location.pathname === "/order-confirmation";

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollToTop />

      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <Outlet
        context={{
          ...cartData,
          ...wishlistData,
          ...orderData,

          cart,
          cartCount,

          wishlist,
          wishlistCount,
          isWishlisted,

          orders,

          addToCart: onAddToCart,
          onAddToCart,

          increaseQuantity: onIncrease,
          decreaseQuantity: onDecrease,
          removeFromCart: onRemove,

          onIncrease,
          onDecrease,
          onRemove,

          clearCart: onClearCart,
          onClearCart,

          toggleWishlist: onToggleWishlist,
          onToggleWishlist,

          removeFromWishlist: onRemoveFromWishlist,
          onRemoveFromWishlist,

          clearWishlist: onClearWishlist,
          onClearWishlist,

          placeOrder: onPlaceOrder,
          onPlaceOrder,

          trackOrder: onTrackOrder,
          onTrackOrder,
        }}
      />

      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;