import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <p className="text-white/70 text-sm sm:text-base">
          Loading Apple Experience
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;