import { motion } from "framer-motion";

const AnimatedButton = ({
  children,
  className = "",
  onClick,
  type = "button",
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        y: -2,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#0071E3] text-white font-medium transition-all duration-300 hover:bg-[#2997FF] ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;