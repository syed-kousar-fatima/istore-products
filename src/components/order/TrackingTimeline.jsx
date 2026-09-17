import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  CircleDot,
  Clock3,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";

const defaultSteps = [
  {
    id: "placed",
    title: "Order Placed",
    description: "Your order has been received successfully.",
    icon: Package,
  },
  {
    id: "confirmed",
    title: "Order Confirmed",
    description: "Your payment has been confirmed.",
    icon: Check,
  },
  {
    id: "processing",
    title: "Preparing Order",
    description: "Your products are being prepared for shipment.",
    icon: PackageCheck,
  },
  {
    id: "shipped",
    title: "Shipped",
    description: "Your package is on its way.",
    icon: Truck,
  },
  {
    id: "delivered",
    title: "Delivered",
    description: "Your order has been delivered.",
    icon: Check,
  },
];

const statusMap = {
  placed: 0,
  pending: 0,
  confirmed: 1,
  processing: 2,
  preparing: 2,
  shipped: 3,
  in_transit: 3,
  delivered: 4,
};

const TrackingTimeline = ({
  status = "confirmed",
  steps = defaultSteps,
}) => {
  const normalizedStatus = String(status).toLowerCase();
  const activeIndex =
    statusMap[normalizedStatus] !== undefined
      ? statusMap[normalizedStatus]
      : 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      className="w-full rounded-2xl border border-border bg-card p-4 sm:p-6 lg:rounded-3xl lg:p-8 2xl:p-10"
    >
      <div className="mb-7 sm:mb-8">
        <h2 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
          Track Your Order
        </h2>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
          Follow your order from confirmation to delivery.
        </p>
      </div>

      <div className="relative">
        <div className="absolute bottom-7 left-5 top-7 w-px bg-border sm:left-6" />

        <motion.div
          initial={{ height: 0 }}
          whileInView={{
            height: `${(activeIndex / Math.max(steps.length - 1, 1)) * 100}%`,
          }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-5 top-7 w-px bg-apple-blue sm:left-6"
        />

        <div className="space-y-6 sm:space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon || CircleDot;
            const completed = index <= activeIndex;
            const current = index === activeIndex;

            return (
              <motion.div
                key={step.id || step.title}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                }}
                className="relative flex gap-4 sm:gap-5"
              >
                <motion.div
                  animate={
                    current
                      ? {
                          scale: [1, 1.08, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.8,
                    repeat: current ? Infinity : 0,
                  }}
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border sm:h-12 sm:w-12 ${
                    completed
                      ? "border-apple-blue bg-apple-blue text-white"
                      : "border-border bg-background text-text-muted"
                  }`}
                >
                  <Icon size={17} className="sm:h-5 sm:w-5" />
                </motion.div>

                <div className="min-w-0 flex-1 pt-1">
                  <div className="flex flex-col gap-1 xs:flex-row xs:items-center xs:justify-between">
                    <h3
                      className={`text-sm font-semibold sm:text-base lg:text-lg ${
                        completed ? "text-white" : "text-text-muted"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {current && (
                      <span className="w-fit rounded-full bg-apple-blue/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-apple-blue sm:text-xs">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-text-secondary sm:text-sm sm:leading-6">
                    {step.description}
                  </p>

                  {step.date && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock3 size={13} />
                      {step.date}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default TrackingTimeline;