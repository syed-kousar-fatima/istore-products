import React from "react";
import { motion } from "framer-motion";

const AnimatedText = ({
  text = "",
  className = "",
  mode = "words",
  delay = 0,
  stagger = 0.06,
  once = true,
}) => {
  const content =
    mode === "letters"
      ? Array.from(text)
      : text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      className={`inline-block ${className}`}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {content.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          variants={{
            hidden: {
              opacity: 0,
              y: 25,
              filter: "blur(8px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className={
            mode === "letters"
              ? "inline-block"
              : "mr-[0.28em] inline-block"
          }
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;