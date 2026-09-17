import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Home,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess = ({
  order,
  onContinueShopping,
  onTrackOrder,
}) => {
  const orderId =
    order?.id ||
    order?.orderId ||
    `iStore-${Date.now().toString().slice(-8)}`;

  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 2xl:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-apple-blue/10 blur-[100px] sm:h-[400px] sm:w-[400px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-[850px] text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 220,
            damping: 14,
          }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.45, duration: 0.35 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_0_50px_rgba(34,197,94,0.25)] sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          >
            <Check size={28} strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-green-400 sm:mt-8 sm:text-sm"
        >
          Order Confirmed
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl"
        >
          Thank you for your order.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base sm:leading-7 lg:text-lg"
        >
          Your order has been successfully placed. We’ll send you an email
          with your order and delivery details.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs text-text-secondary sm:mt-8 sm:px-5 sm:py-3 sm:text-sm"
        >
          <PackageCheck size={16} className="text-apple-blue" />
          Order #{orderId}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-col justify-center gap-3 xs:flex-row sm:mt-10 sm:gap-4"
        >
          <motion.button
            type="button"
            onClick={onTrackOrder}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-apple-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-apple-blue-light sm:min-w-[190px] sm:text-base"
          >
            <PackageCheck size={18} />
            Track Order
            <ArrowRight size={17} />
          </motion.button>

          <motion.button
            type="button"
            onClick={onContinueShopping}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/5 sm:min-w-[190px] sm:text-base"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </motion.button>
        </motion.div>

        <div className="mt-7 sm:mt-9">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-white sm:text-sm"
          >
            <Home size={15} />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default OrderSuccess;