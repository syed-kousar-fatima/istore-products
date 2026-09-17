import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

const Cart = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};

  const cart = outletContext.cart || [];

  const onIncrease = outletContext.onIncrease;
  const onDecrease = outletContext.onDecrease;
  const onRemove = outletContext.onRemove;

  const itemCount = cart.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 1),
    0
  );

  const handleCheckout = () => {
    if (!cart.length) return;

    navigate("/checkout");
  };

  if (!cart.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card">
            <ShoppingBag className="h-9 w-9 text-text-muted" />
          </div>

          <h1 className="mt-7 text-3xl font-bold text-white md:text-5xl">
            Your Bag is Empty
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-text-secondary md:text-base">
            Discover the latest iStore products and add something
            you love to your bag.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-apple-blue px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-apple-light"
          >
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="page-padding pt-28 md:pt-32 xl:pt-40">
        <div className="mx-auto w-full max-w-[2200px]">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mb-8"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-apple-light">
              iStore STORE
            </p>

            <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl">
              Your Bag
            </h1>

            <p className="mt-2 text-sm text-text-secondary">
              {itemCount}{" "}
              {itemCount === 1 ? "item" : "items"} selected
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.selectedColor || item.color || ""}-${item.selectedStorage || item.storage || ""}`}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                >
                  <CartItem
                    item={item}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onRemove={onRemove}
                  />
                </motion.div>
              ))}

              <div className="grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <Truck className="h-5 w-5 text-apple-light" />
                  <span className="text-xs text-text-secondary">
                    Free delivery
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <ShieldCheck className="h-5 w-5 text-apple-light" />
                  <span className="text-xs text-text-secondary">
                    Secure checkout
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <ShoppingBag className="h-5 w-5 text-apple-light" />
                  <span className="text-xs text-text-secondary">
                    Premium products
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.15,
              }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <CartSummary
                cart={cart}
                onCheckout={handleCheckout}
              />

              <Link
                to="/products"
                className="mt-4 flex items-center justify-center gap-2 text-sm text-text-secondary transition hover:text-white"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;