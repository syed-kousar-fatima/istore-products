import { motion } from "framer-motion";
import {
  Cpu,
  Camera,
  Battery,
  Monitor,
  Wifi,
  ShieldCheck,
} from "lucide-react";

const icons = [Cpu, Monitor, Camera, Battery, Wifi, ShieldCheck];

const ProductSpecs = ({ specs = [] }) => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {specs.map((spec, index) => {
        const Icon = spec.icon || icons[index % icons.length];

        return (
          <motion.div
            key={spec.label || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#2997FF]" />

            <p className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/35">
              {spec.label}
            </p>

            <p className="mt-1 text-sm sm:text-base lg:text-lg font-medium text-white">
              {spec.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductSpecs;