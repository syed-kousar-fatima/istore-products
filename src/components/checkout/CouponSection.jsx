import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Tag, X } from "lucide-react";

const CouponSection = ({ coupon, onApply }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const coupons = {
    iStore10: {
      code: "iStore10",
      discount: 10,
      discountType: "percentage",
    },
    SAVE20: {
      code: "SAVE20",
      discount: 20,
      discountType: "fixed",
    },
  };

  const handleApply = () => {
    const normalized = code.trim().toUpperCase();

    if (!normalized) {
      setMessage("Enter a coupon code");
      return;
    }

    if (!coupons[normalized]) {
      setMessage("Invalid coupon code");
      return;
    }

    onApply?.(coupons[normalized]);
    setMessage("");
    setCode("");
  };

  const handleRemove = () => {
    onApply?.(null);
    setMessage("");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      className="rounded-2xl border border-border bg-card p-4 sm:p-6 lg:rounded-3xl lg:p-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-apple-blue/10 text-apple-blue">
          <Tag size={19} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Promo Code
          </h2>
          <p className="mt-1 text-xs text-text-secondary sm:text-sm">
            Apply a discount to your order.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {coupon ? (
          <motion.div
            key="coupon-active"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="flex items-center justify-between gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-3 sm:p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                <Check size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-green-400">
                  {coupon.code}
                </p>
                <p className="mt-0.5 text-xs text-text-secondary">
                  Coupon applied successfully
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="shrink-0 rounded-full p-2 text-text-muted transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Remove coupon"
            >
              <X size={17} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="coupon-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col gap-2 xs:flex-row">
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setMessage("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApply();
                  }
                }}
                placeholder="Enter promo code"
                className="min-h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm uppercase text-white outline-none transition-all placeholder:normal-case placeholder:text-text-muted focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10 sm:min-h-12"
              />

              <motion.button
                type="button"
                onClick={handleApply}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="min-h-11 rounded-xl border border-border px-5 py-3 text-sm font-medium text-white transition-colors hover:border-apple-blue hover:bg-apple-blue/10 sm:min-h-12"
              >
                Apply
              </motion.button>
            </div>

            {message && (
              <p className="mt-2 text-xs text-red-400">{message}</p>
            )}

            <p className="mt-3 text-xs text-text-muted">
              Try iStore10 for 10% off.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CouponSection;