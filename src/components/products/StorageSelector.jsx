import { motion } from "framer-motion";

const StorageSelector = ({
  options = [],
  selected,
  onChange,
}) => {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-white">
        Storage
      </p>

      <div className="grid grid-cols-2 gap-2 xs:grid-cols-3 sm:flex sm:flex-wrap">
        {options.map((option) => {
          const value =
            typeof option === "string"
              ? option
              : option.value;

          const label =
            typeof option === "string"
              ? option
              : option.label || option.value;

          const active = selected === value;

          return (
            <motion.button
              key={value}
              type="button"
              onClick={() => onChange?.(value)}
              whileTap={{ scale: 0.96 }}
              className={`min-w-0 rounded-xl border px-4 py-3 text-xs sm:text-sm font-medium transition-all duration-300 ${
                active
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default StorageSelector;