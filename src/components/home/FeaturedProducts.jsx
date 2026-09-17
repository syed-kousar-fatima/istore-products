import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProductGrid from "../products/ProductGrid";
import SectionHeading from "../common/SectionHeading";

import {
  iphones,
  ipads,
  macbooks,
  watches,
  airpods,
  featured,
} from "../../data";

const FeaturedProducts = ({
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}) => {
  const allProducts = useMemo(
    () => [
      ...iphones,
      ...ipads,
      ...macbooks,
      ...watches,
      ...airpods,
    ],
    []
  );

  const featuredProducts = useMemo(() => {
    if (Array.isArray(featured) && featured.length > 0) {
      return featured
        .map((item) => {
          if (typeof item === "object") {
            return (
              allProducts.find(
                (product) =>
                  String(product.id) === String(item.id)
              ) || item
            );
          }

          return allProducts.find(
            (product) =>
              String(product.id) === String(item)
          );
        })
        .filter(Boolean)
        .slice(0, 8);
    }

    return allProducts.slice(0, 8);
  }, [allProducts]);

  const handleAddToCart = (product) => {
    if (!onAddToCart) {
      console.error(
        "FeaturedProducts: onAddToCart is not available."
      );
      return;
    }

    onAddToCart(product);
  };

  const handleWishlist = (product) => {
    if (!onToggleWishlist) {
      console.error(
        "FeaturedProducts: onToggleWishlist is not available."
      );
      return;
    }

    onToggleWishlist(product);
  };

  return (
    <section className="page-padding section-padding">
      <div className="mx-auto w-full max-w-[2200px]">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <SectionHeading
            title="Featured Collections"
            subtitle="Explore our latest products"
          />
        </motion.div>

        {featuredProducts.length > 0 ? (
          <ProductGrid
            products={featuredProducts}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleWishlist}
            wishlist={wishlist}
          />
        ) : (
          <div className="rounded-3xl border border-border bg-card p-12 text-center">
            <p className="text-text-secondary">
              No featured products available.
            </p>
          </div>
        )}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
          >
            View All Products

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;