import { motion } from "framer-motion";

const ColorSelector = ({
  colors = [],
  selectedColor,
  onChange,
}) => {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-white">
          Color
        </p>

        {selectedColor && (
          <span className="text-xs text-white/40">
            {selectedColor.name || selectedColor}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {colors.map((color, index) => {
          const value =
            typeof color === "string" ? color : color.value;

          const name =
            typeof color === "string" ? color : color.name;

          const selected =
            typeof selectedColor === "string"
              ? selectedColor === color
              : selectedColor?.value === value;

          return (
            <motion.button
              key={`${value}-${index}`}
              type="button"
              onClick={() => onChange?.(color)}
              whileTap={{ scale: 0.9 }}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                selected
                  ? "border-white"
                  : "border-transparent hover:border-white/40"
              }`}
              aria-label={name}
            >
              <span
                className="h-7 w-7 rounded-full border border-black/20 shadow-inner"
                style={{ backgroundColor: value }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;