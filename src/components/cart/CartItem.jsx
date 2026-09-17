import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const quantity = item.quantity || 1;
  const price = Number(item.price) || 0;
  const subtotal = price * quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-3 transition-all duration-300 hover:border-white/15 sm:p-4"
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.04] sm:h-24 sm:w-24 lg:h-28 lg:w-28">
          <motion.img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain p-2"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white sm:text-base lg:text-lg">
                {item.name}
              </h3>

              {item.category && (
                <p className="mt-1 truncate text-xs text-text-secondary sm:text-sm">
                  {item.category}
                </p>
              )}

              {item.color && (
                <p className="mt-1 text-xs text-text-muted">
                  Color: {item.color?.name || item.color}
                </p>
              )}
            </div>

            <motion.button
              type="button"
              onClick={() => onRemove?.(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="shrink-0 rounded-full p-1.5 text-text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 size={16} />
            </motion.button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center overflow-hidden rounded-full border border-border bg-black/30">
              <motion.button
                type="button"
                onClick={() => onDecrease?.(item.id)}
                whileTap={{ scale: 0.85 }}
                className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </motion.button>

              <span className="flex h-8 min-w-8 items-center justify-center border-x border-border px-2 text-xs font-medium text-white sm:h-9 sm:min-w-9 sm:text-sm">
                {quantity}
              </span>

              <motion.button
                type="button"
                onClick={() => onIncrease?.(item.id)}
                whileTap={{ scale: 0.85 }}
                className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </motion.button>
            </div>

            <motion.p
              key={subtotal}
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm font-semibold text-white sm:text-base"
            >
              ${subtotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;