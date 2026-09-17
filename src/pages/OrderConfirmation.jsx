import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Package,
  ArrowRight,
  Truck,
  CalendarDays,
  IndianRupee,
} from "lucide-react";
import {
  Link,
  useLocation,
  useOutletContext,
} from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const outletContext = useOutletContext() || {};

  const orders = outletContext.orders || [];

  const params = new URLSearchParams(location.search);
  const queryOrderId = params.get("orderId");

  const order =
    orders.find(
      (item) =>
        String(item?.id || "").toLowerCase() ===
          String(queryOrderId || "").toLowerCase() ||
        String(item?.orderId || "").toLowerCase() ===
          String(queryOrderId || "").toLowerCase()
    ) || orders[orders.length - 1];

  const finalOrderId =
    order?.id ||
    order?.orderId ||
    queryOrderId;

  const orderStatus =
    order?.status || "processing";

  const formattedStatus = String(orderStatus)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

  const formattedDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : null;

  const total = Number(order?.total || 0);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.94,
          y: 25,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="w-full max-w-2xl rounded-[2rem] border border-border bg-card p-5 text-center sm:p-8 md:p-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 15,
            delay: 0.2,
          }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10"
        >
          <Check className="h-10 w-10 text-green-400" />
        </motion.div>

        <p className="mt-7 text-xs font-medium uppercase tracking-[0.2em] text-apple-light">
          iStore STORE
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Order Confirmed
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
          Thank you for shopping with iStore. Your order has
          been successfully placed.
        </p>

        {order ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 rounded-2xl border border-border bg-background p-4 text-left sm:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-text-muted">
                  Order ID
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-white sm:text-base">
                  {finalOrderId}
                </p>
              </div>

              <div className="w-fit rounded-full bg-apple-blue/10 px-3 py-1.5 text-xs font-medium text-apple-light">
                {formattedStatus}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-apple-light" />

                  <span className="text-xs text-text-secondary">
                    Items
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-white">
                  {order.items?.length || 0} products
                </p>
              </div>

              <div className="rounded-xl border border-border p-3">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-apple-light" />

                  <span className="text-xs text-text-secondary">
                    Total
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-white">
                  ₹{total.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-xl border border-border p-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-apple-light" />

                  <span className="text-xs text-text-secondary">
                    Ordered
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-white">
                  {formattedDate || "Today"}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-apple-blue/10 bg-apple-blue/[0.05] p-4">
              <Truck className="h-5 w-5 shrink-0 text-apple-light" />

              <div>
                <p className="text-sm font-medium text-white">
                  Delivery Status
                </p>

                <p className="mt-1 text-xs text-text-secondary">
                  Your order is currently{" "}
                  {String(orderStatus).replace(
                    /_/g,
                    " "
                  )}
                  .
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="mt-8 rounded-2xl border border-border bg-background p-6">
            <Package className="mx-auto h-8 w-8 text-white/40" />

            <p className="mt-3 text-sm text-text-secondary">
              Your order was placed successfully, but the
              order details are not currently available.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            to={
              finalOrderId
                ? `/track-order/${encodeURIComponent(
                    finalOrderId
                  )}`
                : "/track-order"
            }
            className="flex items-center justify-center gap-2 rounded-full bg-apple-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-apple-light"
          >
            Track Order
            <Truck className="h-4 w-4" />
          </Link>

          <Link
            to="/products"
            className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.05]"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {finalOrderId && (
          <p className="mt-6 text-xs text-text-muted">
            Use order ID{" "}
            <span className="font-medium text-white/60">
              {finalOrderId}
            </span>{" "}
            anytime to track your order.
          </p>
        )}
      </motion.div>
    </main>
  );
};

export default OrderConfirmation;