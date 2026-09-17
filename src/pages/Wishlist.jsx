import React from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/products/ProductCard";

const Wishlist = () => {
  const {
    wishlist = [],
    toggleWishlist,
    isWishlisted,
    addToCart,
  } = useOutletContext();

  return (
    <main className="min-h-screen bg-black px-4 py-24 text-white xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 3xl:px-32">
      <div className="mx-auto w-full max-w-[2200px]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-14"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] xs:h-14 xs:w-14">
            <Heart
              className="h-6 w-6 text-[#2997FF]"
              fill="currentColor"
            />
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2997FF]">
            iStore
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight xs:text-5xl md:text-6xl">
            Your Wishlist
          </h1>

          <p className="mt-4 text-sm text-white/50 sm:text-base">
            {wishlist.length === 0
              ? "Save products you love and find them here anytime."
              : `${wishlist.length} ${
                  wishlist.length === 1 ? "product" : "products"
                } saved`}
          </p>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[400px] flex-col items-center justify-center rounded-[28px] border border-white/10 bg-[#101010] px-6 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.05]">
              <Heart className="h-9 w-9 text-white/40" />
            </div>

            <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">
              Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/45 sm:text-base">
              Tap the heart icon on any product to save it to your wishlist.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#2997FF] hover:text-white"
            >
              <ShoppingBag className="h-4 w-4" />
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-8"
          >
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={isWishlisted(product.id)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;