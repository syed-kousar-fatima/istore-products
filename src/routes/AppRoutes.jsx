import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Search from "../pages/Search";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import OrderHistory from "../pages/OrderHistory";
import TrackOrder from "../pages/TrackOrder";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="products" element={<Products />} />
        <Route
          path="products/:category"
          element={<Products />}
        />

        <Route
          path="product/:id"
          element={<ProductDetails />}
        />

        <Route path="cart" element={<Cart />} />

        <Route
          path="wishlist"
          element={<Wishlist />}
        />

        <Route
          path="search"
          element={<Search />}
        />

        <Route
          path="checkout"
          element={<Checkout />}
        />

        <Route
          path="order-confirmation"
          element={<OrderConfirmation />}
        />

        <Route
          path="order-history"
          element={<OrderHistory />}
        />

        <Route
          path="track-order"
          element={<TrackOrder />}
        />

        <Route
          path="track-order/:orderId"
          element={<TrackOrder />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;