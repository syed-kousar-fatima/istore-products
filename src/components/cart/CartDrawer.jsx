import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CheckoutButton from "./CheckoutButton";

const CartDrawer = ({
  isOpen,
  onClose,
  cart = [],
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-[100] flex h-screen w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] 2xl:max-w-[620px] flex-col border-l border-border bg-background shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
              <div>
                <h2 className="text-lg font-semibold text-text-primary sm:text-xl lg:text-2xl">
                  Your Bag
                </h2>
                <p className="mt-1 text-xs text-text-secondary sm:text-sm">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-text-secondary transition-colors hover:bg-white/10 hover:text-white sm:h-10 sm:w-10"
                aria-label="Close cart"
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              {cart.length === 0 ? (
                <motion.div
                  className="flex min-h-[60vh] flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 sm:h-20 sm:w-20">
                    <ShoppingBag
                      size={28}
                      className="text-text-secondary sm:h-9 sm:w-9"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    Your bag is empty
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-text-secondary">
                    Add your favorite products and they will appear here.
                  </p>

                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-apple-blue px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-apple-blue-light sm:px-6"
                  >
                    Continue Shopping
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                        onRemove={onRemove}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="shrink-0 border-t border-border bg-surface px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
                <CartSummary cart={cart} />
                <CheckoutButton
                  onClick={onCheckout}
                  className="mt-4 w-full sm:mt-5"
                />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;