import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ChevronRight,
  ShoppingBag,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  getOrderItemCount,
  getOrderStatusLabel,
  sortOrdersByDate,
} from "../utils/orderHelpers";
import formatPrice from "../utils/formatPrice";

const OrderHistory = ({ orders = [] }) => {
  const [status, setStatus] = useState("all");

  const sortedOrders = useMemo(
    () => sortOrdersByDate(orders, "desc"),
    [orders]
  );

  const filteredOrders = useMemo(() => {
    if (status === "all") return sortedOrders;

    return sortedOrders.filter(
      (order) =>
        String(order.status || "").toLowerCase() ===
        status.toLowerCase()
    );
  }, [sortedOrders, status]);

  const statuses = [
    "all",
    "confirmed",
    "preparing",
    "shipped",
    "delivered",
  ];

  if (!orders.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
        <div className="w-full max-w-lg text-center">
          <Package className="mx-auto h-14 w-14 text-text-muted" />
          <h1 className="mt-6 text-3xl font-bold text-white md:text-5xl">
            No Orders Yet
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Your completed iStore orders will appear here.
          </p>
          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-apple-blue px-7 py-3 text-sm font-semibold text-white"
          >
            Start Shopping
            <ShoppingBag className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="page-padding pt-28 xs:pt-24 md:pt-32 xl:pt-40">
        <div className="mx-auto w-full max-w-[2200px]">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-apple-light">
              iStore ACCOUNT
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-5xl xl:text-6xl">
              Order History
            </h1>
            <p className="mt-3 text-sm text-text-secondary">
              Review and track your previous orders.
            </p>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {statuses.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStatus(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium capitalize transition sm:text-sm ${
                  status === item
                    ? "bg-apple-blue text-white"
                    : "border border-border bg-card text-text-secondary hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-5">
            {filteredOrders.map((order, index) => {
              const orderId = order.orderId || order.id;
              const items = order.items || order.products || [];
              const itemCount = getOrderItemCount(order);

              return (
                <motion.article
                  key={orderId || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3) }}
                  className="rounded-3xl border border-border bg-card p-4 sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5">
                        <Package className="h-5 w-5 text-apple-light" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-text-muted">
                          Order ID
                        </p>
                        <h2 className="mt-1 truncate text-sm font-semibold text-white sm:text-base">
                          {orderId}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                          <span>
                            {new Date(
                              order.createdAt || Date.now()
                            ).toLocaleDateString()}
                          </span>

                          <span>•</span>

                          <span>
                            {itemCount}{" "}
                            {itemCount === 1 ? "item" : "items"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-apple-blue/30 bg-apple-blue/10 px-3 py-1.5 text-xs font-medium text-apple-light">
                        {getOrderStatusLabel(order.status)}
                      </span>

                      <span className="text-lg font-semibold text-white">
                        {formatPrice(order.total)}
                      </span>

                      {orderId && (
                        <Link
                          to={`/track-order/${orderId}`}
                          className="flex items-center gap-1 rounded-full border border-border px-4 py-2 text-xs font-medium text-white transition hover:border-apple-blue"
                        >
                          View
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {items.length > 0 && (
                    <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2 xl:grid-cols-4">
                      {items.slice(0, 4).map((item, itemIndex) => (
                        <div
                          key={`${item.id || itemIndex}-${itemIndex}`}
                          className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3"
                        >
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-black">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name || "Product"}
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <ShoppingBag className="h-5 w-5 text-text-muted" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-white">
                              {item.name}
                            </p>
                            <p className="mt-1 text-[11px] text-text-muted">
                              Qty {item.quantity || 1}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {order.estimatedDelivery && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
                      <Clock className="h-4 w-4" />
                      Estimated delivery:{" "}
                      {new Date(
                        order.estimatedDelivery
                      ).toLocaleDateString()}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>

          {!filteredOrders.length && (
            <div className="rounded-3xl border border-border bg-card p-12 text-center">
              <Package className="mx-auto h-10 w-10 text-text-muted" />
              <p className="mt-4 text-sm text-text-secondary">
                No orders match this status.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default OrderHistory;