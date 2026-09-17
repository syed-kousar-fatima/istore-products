import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";

import ProductGallery from "../components/products/ProductGallery";
import ProductSpecs from "../components/products/ProductSpecs";
import ColorSelector from "../components/products/ColorSelector";
import StorageSelector from "../components/products/StorageSelector";
import ProductTabs from "../components/products/ProductTabs";
import ProductGrid from "../components/products/ProductGrid";

import {
  iphones,
  ipads,
  macbooks,
  watches,
  airpods,
} from "../data";

import formatPrice from "../utils/formatPrice";

const ProductDetails = ({
  onAddToCart: propAddToCart,
  onToggleWishlist: propToggleWishlist,
  wishlist: propWishlist,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const outletContext = useOutletContext() || {};

  const onAddToCart =
    propAddToCart || outletContext.onAddToCart || outletContext.addToCart;

  const onToggleWishlist =
    propToggleWishlist || outletContext.onToggleWishlist;

  const wishlist = propWishlist || outletContext.wishlist || [];

  const products = useMemo(
    () => [
      ...iphones,
      ...ipads,
      ...macbooks,
      ...watches,
      ...airpods,
    ],
    []
  );

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.value ||
      product?.colors?.[0] ||
      ""
  );

  const storageOptions =
    product?.storageOptions ||
    product?.storage ||
    [];

  const [selectedStorage, setSelectedStorage] = useState(
    storageOptions?.[0]?.value ||
      storageOptions?.[0] ||
      ""
  );

  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Product Not Found
          </h1>

          <p className="mt-3 text-text-secondary">
            The product you are looking for does not exist.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-apple-blue px-6 py-3 text-sm font-medium text-white transition hover:bg-apple-light"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  const images = [
    ...(product.images || []),
    product.image,
    product.hoverImage,
  ].filter(Boolean);

  const isWishlisted = wishlist.some(
    (item) =>
      String(item?.id ?? item) === String(product.id)
  );

  const colors = product.colors || [];

  const specs =
    product.specs ||
    product.specifications ||
    [];

  const handleAddToCart = () => {
    if (!onAddToCart) {
      console.error(
        "Add to Cart function is not available. Check MainLayout Outlet context."
      );
      return;
    }

    const cartProduct = {
      ...product,
      selectedColor,
      selectedStorage,
      color: selectedColor,
      storage: selectedStorage,
      quantity: 1,
    };

    onAddToCart(cartProduct);

    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 1800);
  };

  const handleBuyNow = () => {
    if (!onAddToCart) {
      console.error(
        "Add to Cart function is not available. Check MainLayout Outlet context."
      );
      return;
    }

    const cartProduct = {
      ...product,
      selectedColor,
      selectedStorage,
      color: selectedColor,
      storage: selectedStorage,
      quantity: 1,
    };

    onAddToCart(cartProduct);

    navigate("/cart");
  };

  const handleWishlist = () => {
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <section className="page-padding pt-24 xs:pt-28 md:pt-32 xl:pt-40">
        <div className="mx-auto w-full max-w-[2200px]">
          <Link
            to="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-14 xl:gap-20">
            <div className="min-w-0">
              <ProductGallery
                images={images}
                name={product.name}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {product.badge && (
                  <span className="rounded-full bg-apple-blue/15 px-3 py-1 text-xs font-medium text-apple-light">
                    {product.badge}
                  </span>
                )}

                <span className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white xs:text-4xl md:text-5xl xl:text-6xl">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                  {product.description}
                </p>
              )}

              {product.rating && (
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-yellow-400">
                    ★
                  </span>

                  <span className="text-sm text-white">
                    {product.rating}
                  </span>

                  {product.reviews && (
                    <span className="text-sm text-text-muted">
                      ({product.reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              <div className="mt-7 text-3xl font-semibold text-white md:text-4xl">
                {formatPrice(product.price)}
              </div>

              {colors.length > 0 && (
                <div className="mt-8">
                  <ColorSelector
                    colors={colors}
                    selectedColor={selectedColor}
                    onChange={setSelectedColor}
                  />
                </div>
              )}

              {storageOptions.length > 0 && (
                <div className="mt-7">
                  <StorageSelector
                    options={storageOptions}
                    selected={selectedStorage}
                    onChange={setSelectedStorage}
                  />
                </div>
              )}

              <div className="mt-8 grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 rounded-full border px-4 py-3.5 text-sm font-semibold transition ${
                    addedToCart
                      ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-apple-blue bg-transparent text-white hover:bg-apple-blue/10"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  className="rounded-full bg-apple-blue px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-apple-light"
                >
                  Buy Now
                </motion.button>
              </div>

              <button
                type="button"
                onClick={handleWishlist}
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm transition ${
                  isWishlisted
                    ? "border-red-500/50 bg-red-500/10 text-red-400"
                    : "border-border text-text-secondary hover:border-white/30 hover:text-white"
                }`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={
                    isWishlisted
                      ? "currentColor"
                      : "none"
                  }
                />

                {isWishlisted
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>

              <div className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-apple-light" />

                  <div>
                    <p className="text-xs font-medium text-white">
                      Free Delivery
                    </p>

                    <p className="text-[11px] text-text-muted">
                      Fast shipping
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-apple-light" />

                  <div>
                    <p className="text-xs font-medium text-white">
                      Secure Payment
                    </p>

                    <p className="text-[11px] text-text-muted">
                      Protected checkout
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-apple-light" />

                  <div>
                    <p className="text-xs font-medium text-white">
                      Easy Returns
                    </p>

                    <p className="text-[11px] text-text-muted">
                      Hassle-free returns
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {specs.length > 0 && (
        <section className="page-padding section-padding">
          <div className="mx-auto w-full max-w-[2200px]">
            <ProductSpecs specs={specs} />
          </div>
        </section>
      )}

      <section className="page-padding pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[2200px]">
          <ProductTabs
            description={product.description}
            specifications={specs}
            features={product.features || []}
          />
        </div>
      </section>

      <section className="page-padding pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-[2200px]">
          <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            You Might Also Like
          </h2>

          <ProductGrid
            products={products
              .filter(
                (item) =>
                  item.category === product.category &&
                  item.id !== product.id
              )
              .slice(0, 4)}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wishlist={wishlist}
          />
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;