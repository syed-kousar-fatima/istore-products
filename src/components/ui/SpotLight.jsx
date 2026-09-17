import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const Spotlight = ({
  children,
  className = "",
  size = 350,
  color = "rgba(0,113,227,0.16)",
}) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setPosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          width: size,
          height: size,
          left: position.x - size / 2,
          top: position.y - size / 2,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Spotlight;