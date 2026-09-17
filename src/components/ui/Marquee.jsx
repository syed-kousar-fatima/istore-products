import React from "react";
import { motion } from "framer-motion";

const Marquee = ({
  items = [],
  direction = "left",
  speed = 25,
  pauseOnHover = true,
  renderItem,
  className = "",
}) => {
  const content = [...items, ...items];

  const animation =
    direction === "right"
      ? {
          x: ["-50%", "0%"],
        }
      : {
          x: ["0%", "-50%"],
        };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div
        className={`flex w-max items-center gap-4 sm:gap-6 lg:gap-8 ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        animate={animation}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {content.map((item, index) => (
          <div
            key={`${item?.id || item?.name || index}-${index}`}
            className="shrink-0"
          >
            {renderItem ? (
              renderItem(item, index)
            ) : (
              <div className="rounded-full border border-border bg-card px-5 py-2.5 text-sm text-text-secondary sm:px-6 sm:py-3 sm:text-base">
                {item?.name || item}
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;