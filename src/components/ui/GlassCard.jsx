import React from "react";
import { motion } from "framer-motion";

const GlassCard = ({
  children,
  className = "",
  hover = true,
  onClick,
  as = "div",
}) => {
  const Component = motion[as] || motion.div;

  return (
    <Component
      onClick={onClick}
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-soft backdrop-blur-2xl transition-all duration-300 hover:border-white/20 sm:rounded-3xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent opacity-70" />
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default GlassCard;