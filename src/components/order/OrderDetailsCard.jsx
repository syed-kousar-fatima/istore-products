import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Phone,
  Truck,
} from "lucide-react";

const OrderDetailsCard = ({ order = {} }) => {
  const items = order.items || order.products || [];
  const orderId = order.id || order.orderId || "iStore-ORDER";
  const status = order.status || "Confirmed";
  const paymentMethod = order.paymentMethod || "Card";
  const email = order.email || order.customer?.email || "—";
  const phone = order.phone || order.customer?.phone || "—";
  const address =
    order.address ||
    order.shippingAddress ||
    order.customer?.address ||
    "Shipping address not available";

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  const subtotal =
    order.subtotal ??
    items.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (item.quantity || 1),
      0
    );

  const discount = Number(order.discount) || 0;
  const shipping = Number(order.shipping) || 0;
  const tax =
    order.tax !== undefined
      ? Number(order.tax)
      : Math.max(0, subtotal - discount) * 0.08;

  const total =
    order.total !== undefined
      ? Number(order.total)
      : subtotal - discount + shipping + tax;

  const formatPrice = (value) =>
    `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const details = [
    {
      icon: CalendarDays,
      label: "Order Date",
      value: date,
    },
    {
      icon: CreditCard,
      label: "Payment",
      value: paymentMethod,
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
    },
    {
      icon: Phone,
      label: "Phone",
      value: phone,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      className="w-full rounded-2xl border border-border bg-card p-4 sm:p-6 lg:rounded-3xl lg:p-8 2xl:p-10"
    >
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-apple-blue/10 text-apple-blue">
            <Package size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
              Order Details
            </h2>
            <p className="mt-1 text-xs text-text-secondary sm:text-sm">
              #{orderId}
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 sm:px-4 sm:py-2 sm:text-sm">
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 py-5 xs:grid-cols-2 sm:gap-4 sm:py-6 lg:grid-cols-4">
        {details.map((detail) => {
          const Icon = detail.icon;

          return (
            <div
              key={detail.label}
              className="rounded-xl border border-border bg-background p-3.5 sm:p-4"
            >
              <div className="mb-2 flex items-center gap-2 text-text-muted">
                <Icon size={15} />
                <span className="text-xs">{detail.label}</span>
              </div>

              <p className="truncate text-sm font-medium text-white sm:text-base">
                {detail.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-8 2xl:grid-cols-[minmax(0,1fr)_420px]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
            <Truck size={17} className="text-apple-blue" />
            Delivery Address
          </div>

          <div className="flex gap-3 rounded-xl border border-border bg-background p-4 sm:p-5">
            <MapPin
              size={18}
              className="mt-0.5 shrink-0 text-text-secondary"
            />

            <p className="text-sm leading-6 text-text-secondary sm:text-base">
              {typeof address === "string"
                ? address
                : `${address.line1 || ""}, ${address.city || ""}, ${
                    address.state || ""
                  } ${address.postalCode || ""}`}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-text-secondary">
              <span>Shipping</span>
              <span className="text-green-400">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>

            <div className="flex justify-between text-text-secondary">
              <span>Tax</span>
              <span className="text-white">{formatPrice(tax)}</span>
            </div>

            <div className="my-3 h-px bg-border" />

            <div className="flex justify-between text-base font-semibold text-white sm:text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default OrderDetailsCard;