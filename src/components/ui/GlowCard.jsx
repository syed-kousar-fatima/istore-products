import React from "react";
import { motion } from "framer-motion";

const GlowCard = ({
  children,
  className = "",
  glowColor = "rgba(0,113,227,0.28)",
  intensity = "medium",
  onClick,
}) => {
  const glow =
    intensity === "strong"
      ? "0 0 90px"
      : intensity === "soft"
      ? "0 0 35px"
      : "0 0 60px";

  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        y: -8,
        boxShadow: `${glow} ${glowColor}`,
      }}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-4 transition-colors duration-300 hover:border-white/20 sm:rounded-3xl sm:p-6 lg:p-8 2xl:p-10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:-right-28 sm:-top-28 sm:h-56 sm:w-56"
        style={{ backgroundColor: glowColor }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlowCard;