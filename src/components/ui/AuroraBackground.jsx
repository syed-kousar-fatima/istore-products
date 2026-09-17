import React from "react";
import { motion } from "framer-motion";

const AuroraBackground = ({
  children,
  className = "",
  intensity = "medium",
}) => {
  const opacity =
    intensity === "strong"
      ? "opacity-80"
      : intensity === "soft"
      ? "opacity-40"
      : "opacity-60";

  return (
    <div
      className={`relative isolate overflow-hidden bg-background ${className}`}
    >
      <div className={`pointer-events-none absolute inset-0 ${opacity}`}>
        <motion.div
          animate={{
            x: [0, 70, -40, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[15%] -top-[20%] h-[45vw] w-[45vw] min-h-[280px] min-w-[280px] rounded-full bg-blue-600/20 blur-[100px] sm:blur-[130px] lg:blur-[160px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 45, 0],
            y: [0, 40, -35, 0],
            scale: [1, 0.9, 1.12, 1],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[20%] -right-[15%] h-[50vw] w-[50vw] min-h-[300px] min-w-[300px] rounded-full bg-cyan-500/10 blur-[110px] sm:blur-[140px] lg:blur-[180px]"
        />

        <motion.div
          animate={{
            x: [0, 35, -30, 0],
            y: [0, -45, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[35vw] w-[35vw] min-h-[220px] min-w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px] sm:blur-[140px]"
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuroraBackground;