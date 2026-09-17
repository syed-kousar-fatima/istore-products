import React from "react";
import { useOutletContext } from "react-router-dom";

import Hero from "../components/home/Hero";
import ProductCategories from "../components/home/ProductCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewLaunches from "../components/home/NewLaunches";
import AppleEcosystem from "../components/home/AppleEcosystem";
import WhyApple from "../components/home/WhyApple";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  const outletContext = useOutletContext() || {};

  const onAddToCart =
    outletContext.onAddToCart ||
    outletContext.addToCart;

  const onToggleWishlist =
    outletContext.onToggleWishlist ||
    outletContext.toggleWishlist;

  const wishlist = outletContext.wishlist || [];

  return (
    <main className="min-h-screen w-full overflow-hidden bg-background text-text-primary">
      <Hero />

      <ProductCategories />

      <FeaturedProducts
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
      />

      <NewLaunches />

      <AppleEcosystem />

      <WhyApple />

      <Newsletter />
    </main>
  );
};

export default Home;