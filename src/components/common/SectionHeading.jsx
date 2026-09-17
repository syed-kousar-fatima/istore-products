import { motion } from "framer-motion";

const SectionHeading = ({
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`mb-10 md:mb-14 lg:mb-16 ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
    >
      {subtitle && (
        <span className="inline-block text-sm sm:text-base font-medium tracking-[0.25em] uppercase text-[#2997FF] mb-3">
          {subtitle}
        </span>
      )}

      <h2 className="text-3xl xs:text-4xl md:text-5xl xl:text-6xl 3xl:text-7xl font-bold text-white leading-tight tracking-tight">
        {title}
      </h2>

      <div
        className={`mt-5 h-[3px] w-20 bg-[#0071E3] rounded-full ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
};

export default SectionHeading;