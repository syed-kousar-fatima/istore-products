import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutButton = ({
  onClick,
  disabled = false,
  children = "Checkout",
  className = "",
}) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (disabled) return;

    if (onClick) {
      onClick();
      return;
    }

    navigate("/checkout");
  };

  return (
    <motion.button
      type="button"
      onClick={handleCheckout}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={`group relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-apple-blue px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-apple-blue-light hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-14 sm:px-6 sm:text-base lg:text-lg ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />

      <LockKeyhole
        size={16}
        className="relative sm:h-[18px] sm:w-[18px]"
      />

      <span className="relative">
        {children}
      </span>

      <ArrowRight
        size={17}
        className="relative transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
      />
    </motion.button>
  );
};

export default CheckoutButton;