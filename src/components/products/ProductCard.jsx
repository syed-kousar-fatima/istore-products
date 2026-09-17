import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  ArrowUpRight,
  Star,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const {
    id,
    name,
    category,
    price,
    image,
    hoverImage,
    rating = 5,
    badge,
    colors = [],
  } = product;

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!onAddToCart) return;

    onAddToCart({
      ...product,
      quantity: 1,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onToggleWishlist?.(product);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#101010] transition-all duration-500 hover:border-white/[0.16] hover:shadow-[0_20px_70px_rgba(0,0,0,0.45)] xs:rounded-[22px] sm:rounded-[24px] md:rounded-[26px] lg:rounded-[28px] xl:rounded-[30px] 2xl:rounded-[32px]"
    >
      {badge && (
        <div className="absolute left-3 top-3 z-30 xs:left-4 xs:top-4 sm:left-5 sm:top-5">
          <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-black sm:text-xs">
            {badge}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={handleWishlist}
        aria-label={
          isWishlisted ? "Remove from wishlist" : "Add to wishlist"
        }
        className={`absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 backdrop-blur-xl transition-all duration-300 xs:right-4 xs:top-4 sm:right-5 sm:top-5 sm:h-10 sm:w-10 md:h-11 md:w-11 ${
          isWishlisted
            ? "bg-white text-black"
            : "bg-black/40 text-white/60 hover:bg-white hover:text-black"
        }`}
      >
        <Heart
          className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </button>

      <Link
        to={`/product/${id}`}
        className="block"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[280px] w-full overflow-hidden bg-gradient-to-b from-[#171717] to-[#0b0b0b] xs:h-[300px] sm:h-[330px] md:h-[360px] lg:h-[390px] xl:h-[430px] 2xl:h-[470px] 3xl:h-[540px]">
          <div className="absolute inset-[10px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#141414] xs:inset-[12px] sm:inset-[14px] md:inset-[16px] lg:inset-[18px] xl:inset-[20px] 2xl:inset-[22px] 3xl:inset-[26px]">
            {image && (
              <motion.img
                src={image}
                alt={name}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  hoverImage ? "group-hover:opacity-0" : ""
                }`}
                whileHover={{ scale: 1.04 }}
              />
            )}

            {hoverImage && (
              <motion.img
                src={hoverImage}
                alt={`${name} alternate`}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            )}
          </div>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 translate-y-4 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/75 px-4 py-2 text-xs text-white opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View Product
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="flex min-h-[190px] flex-col p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-9 2xl:p-10">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#2997FF] sm:text-xs md:text-sm">
            {category}
          </p>

          <div className="grid min-h-[60px] grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <h3 className="line-clamp-2 text-base font-semibold leading-tight tracking-tight text-white xs:text-lg sm:text-xl md:text-2xl xl:text-3xl">
              {name}
            </h3>

            <p className="whitespace-nowrap text-sm font-semibold text-white xs:text-base sm:text-lg md:text-xl xl:text-2xl">
              {typeof price === "number"
                ? `₹${price.toLocaleString("en-IN")}`
                : price}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
              <span className="text-xs text-white/55 sm:text-sm">
                {rating}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {colors.slice(0, 5).map((color, index) => (
                <span
                  key={`${id}-color-${index}`}
                  title={color?.name || color}
                  className="h-3.5 w-3.5 rounded-full border border-white/20 sm:h-4 sm:w-4"
                  style={{
                    backgroundColor:
                      typeof color === "string"
                        ? color
                        : color?.value || "#ffffff",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-auto px-4 pb-4 xs:px-5 xs:pb-5 sm:px-6 sm:pb-6 md:px-7 md:pb-7 lg:px-8 lg:pb-8 xl:px-9 xl:pb-9 2xl:px-10 2xl:pb-10">
        <motion.button
          type="button"
          onClick={handleAddToCart}
          whileTap={{ scale: 0.96 }}
          disabled={added}
          className={`flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all sm:min-h-[48px] sm:text-sm md:min-h-[50px] md:text-base 2xl:min-h-[56px] 2xl:text-lg ${
            added
              ? "bg-green-500 text-white"
              : "bg-white text-black hover:bg-[#2997FF] hover:text-white"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ProductCard;