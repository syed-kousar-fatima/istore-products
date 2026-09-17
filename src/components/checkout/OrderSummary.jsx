import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Package } from "lucide-react";

const OrderSummary = ({ cart = [], coupon = null }) => {
  const subtotal = cart.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  const discount = coupon?.discount
    ? coupon.discountType === "percentage"
      ? subtotal * (coupon.discount / 100)
      : coupon.discount
    : 0;

  const shipping = subtotal > 0 ? 0 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const formatPrice = (value) =>
    `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      className="overflow-hidden rounded-2xl border border-border bg-card lg:rounded-3xl"
    >
      <div className="border-b border-border p-4 sm:p-6 lg:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-apple-blue/10 text-apple-blue">
            <Package size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Order Summary
            </h2>
            <p className="text-xs text-text-secondary sm:text-sm">
              {cart.length} product{cart.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="max-h-[360px] space-y-4 overflow-y-auto p-4 sm:p-6 lg:max-h-[420px] lg:p-7">
        {cart.map((item) => {
          const quantity = item.quantity || 1;

          return (
            <div
              key={item.id}
              className="flex gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.04] sm:h-20 sm:w-20">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain p-1.5"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-white">
                  {item.name}
                </h3>

                <p className="mt-1 text-xs text-text-secondary">
                  Qty: {quantity}
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {formatPrice((Number(item.price) || 0) * quantity)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 border-t border-border bg-surface p-4 sm:p-6 lg:p-7">
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Subtotal</span>
          <span className="text-white">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-400">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-text-secondary">
          <span>Shipping</span>
          <span className="text-green-400">Free</span>
        </div>

        <div className="flex justify-between text-sm text-text-secondary">
          <span>Estimated Tax</span>
          <span className="text-white">{formatPrice(tax)}</span>
        </div>

        <div className="my-4 h-px bg-border" />

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-white">
            Total
          </span>
          <motion.span
            key={total}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xl font-bold text-white sm:text-2xl"
          >
            {formatPrice(total)}
          </motion.span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-500/5 px-3 py-2.5 text-xs text-green-400">
          <CheckCircle2 size={15} className="shrink-0" />
          Free shipping included
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;