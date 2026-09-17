import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products = [],
  onAddToCart,
  onView,
  onToggleWishlist,
  wishlist = [],
}) => {
  const handleAddToCart = (product) => {
    if (!onAddToCart) {
      console.error("Add to Cart handler is missing.");
      return;
    }

    onAddToCart(product);
  };

  const handleView = (product) => {
    if (onView) {
      onView(product);
    }
  };

  const handleWishlist = (product) => {
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  if (!products.length) {
    return (
      <div className="flex min-h-[250px] items-center justify-center rounded-3xl border border-border bg-card">
        <p className="text-sm text-text-secondary">
          No products available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.45,
            delay: Math.min(index * 0.06, 0.3),
          }}
        >
          <ProductCard
            product={product}
            onAddToCart={handleAddToCart}
            onView={handleView}
            onToggleWishlist={handleWishlist}
            isWishlisted={wishlist.some(
              (item) =>
                String(item?.id ?? item) ===
                String(product.id)
            )}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;