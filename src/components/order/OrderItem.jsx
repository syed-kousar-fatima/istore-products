import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";

const OrderItem = ({
  item,
  editable = false,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const quantity = item.quantity || 1;
  const price = Number(item.price) || 0;
  const subtotal = price * quantity;

  const formatPrice = (value) =>
    `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ y: -2 }}
      className="group rounded-2xl border border-border bg-card p-3 transition-all duration-300 hover:border-white/15 sm:p-4 lg:p-5"
    >
      <div className="flex gap-3 sm:gap-4 lg:gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.04] sm:h-24 sm:w-24 lg:h-28 lg:w-28 2xl:h-32 2xl:w-32">
          <motion.img
            src={item.image}
            alt={item.name || "Product"}
            className="h-full w-full object-contain p-2"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white sm:text-base lg:text-lg">
                {item.name || "Product"}
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

              {item.storage && (
                <p className="mt-1 text-xs text-text-muted">
                  Storage: {item.storage}
                </p>
              )}
            </div>

            {editable && (
              <motion.button
                type="button"
                onClick={() => onRemove?.(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="shrink-0 rounded-full p-1.5 text-text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
                aria-label="Remove product"
              >
                <Trash2 size={16} />
              </motion.button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            {editable ? (
              <div className="flex items-center overflow-hidden rounded-full border border-border bg-background">
                <button
                  type="button"
                  onClick={() => onDecrease?.(item.id)}
                  className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>

                <span className="flex h-8 min-w-8 items-center justify-center border-x border-border px-2 text-xs font-medium text-white sm:h-9 sm:min-w-9 sm:text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => onIncrease?.(item.id)}
                  className="flex h-8 w-8 items-center justify-center text-text-secondary transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <p className="text-xs text-text-secondary sm:text-sm">
                Quantity: <span className="text-white">{quantity}</span>
              </p>
            )}

            <p className="text-sm font-bold text-white sm:text-base lg:text-lg">
              {formatPrice(subtotal)}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default OrderItem;