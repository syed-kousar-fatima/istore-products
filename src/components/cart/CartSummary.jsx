import React, { useMemo } from "react";
import { Tag, Truck, ShieldCheck } from "lucide-react";
import CheckoutButton from "./CheckoutButton";
import formatPrice from "../../utils/formatPrice";
import {
  TAX_RATE,
  SHIPPING_COST,
  FREE_SHIPPING_THRESHOLD,
} from "../../utils/constants";

const CartSummary = ({
  cart = [],
  onCheckout,
}) => {
  const summary = useMemo(() => {
    const subtotal = cart.reduce(
      (total, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        return total + price * quantity;
      },
      0
    );

    const shipping =
      subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_COST;

    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
    };
  }, [cart]);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-white">
          Order Summary
        </h2>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-text-secondary">
              Subtotal
            </span>

            <span className="text-sm font-medium text-white">
              {formatPrice(summary.subtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              <Truck className="h-4 w-4" />
              Shipping
            </span>

            <span className="text-sm font-medium text-green-400">
              {summary.shipping === 0
                ? "FREE"
                : formatPrice(summary.shipping)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-text-secondary">
              Tax
            </span>

            <span className="text-sm font-medium text-white">
              {formatPrice(summary.tax)}
            </span>
          </div>
        </div>

        <div className="my-6 border-t border-border" />

        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-semibold text-white">
            Total
          </span>

          <span className="text-2xl font-bold text-white">
            {formatPrice(summary.total)}
          </span>
        </div>

        <CheckoutButton
          onClick={onCheckout}
          disabled={!cart.length}
          className="mt-6"
        >
          Proceed to Checkout
        </CheckoutButton>

        <div className="mt-5 grid gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-3">
            <ShieldCheck className="h-5 w-5 text-apple-light" />

            <div>
              <p className="text-xs font-medium text-white">
                Secure Checkout
              </p>

              <p className="mt-0.5 text-[11px] text-text-muted">
                Your payment information is protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-3">
            <Tag className="h-5 w-5 text-apple-light" />

            <div>
              <p className="text-xs font-medium text-white">
                iStore Exclusive
              </p>

              <p className="mt-0.5 text-[11px] text-text-muted">
                Premium products, delivered to you
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;