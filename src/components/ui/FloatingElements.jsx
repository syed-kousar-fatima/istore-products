import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Circle,
  Triangle,
  Square,
  Hexagon,
} from "lucide-react";

const FloatingElements = ({
  count = 8,
  className = "",
  intensity = 1,
}) => {
  const icons = [Sparkles, Circle, Triangle, Square, Hexagon];

  const elements = Array.from({ length: count }, (_, index) => ({
    id: `floating-element-${index}`,
    Icon: icons[index % icons.length],
    size: 12 + (index % 4) * 6,
    left: `${8 + ((index * 13) % 84)}%`,
    top: `${5 + ((index * 17) % 88)}%`,
    duration: 5 + (index % 5),
    delay: index * 0.35,
    x: ((index % 2 === 0 ? 1 : -1) * (12 + (index % 4) * 8)) * intensity,
    y: ((index % 3 === 0 ? -1 : 1) * (15 + (index % 5) * 8)) * intensity,
    rotate: index % 2 === 0 ? 360 : -360,
  }));

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {elements.map(
        ({
          id,
          Icon,
          size,
          left,
          top,
          duration,
          delay,
          x,
          y,
          rotate,
        }) => (
          <motion.div
            key={id}
            className="absolute"
            style={{
              left,
              top,
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: [0.15, 0.45, 0.15],
              scale: [0.8, 1, 0.8],
              x: [0, x, 0],
              y: [0, y, 0],
              rotate: [0, rotate],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              size={size}
              strokeWidth={1.2}
              className="text-[#2997FF]"
            />
          </motion.div>
        )
      )}
    </div>
  );
};

export default FloatingElements;