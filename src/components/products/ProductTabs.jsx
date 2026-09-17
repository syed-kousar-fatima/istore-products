import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Cpu,
  Database,
  Info,
  Settings2,
  Sparkles,
} from "lucide-react";

const ProductTabs = ({
  description = "",
  features = [],
  specifications = {},
  specs = {},
}) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    {
      id: "description",
      label: "Overview",
      icon: Info,
    },
    {
      id: "features",
      label: "Features",
      icon: Sparkles,
    },
    {
      id: "specifications",
      label: "Specifications",
      icon: Settings2,
    },
  ];

  const normalizedSpecifications =
    Array.isArray(specifications)
      ? specifications
      : Array.isArray(specs)
        ? specs
        : Object.entries(specifications || specs || {}).map(
            ([label, value]) => ({
              label,
              value,
            })
          );

  const normalizedFeatures = Array.isArray(features)
    ? features
    : Object.entries(features || {}).map(([label, value]) => ({
        label,
        value,
      }));

  const formatLabel = (value) => {
    return String(value)
      .replace(/([A-Z])/g, " $1")
      .replace(/[-_]/g, " ")
      .replace(/^./, (char) => char.toUpperCase())
      .trim();
  };

  const renderContent = () => {
    if (activeTab === "description") {
      return (
        <motion.div
          key="description"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl"
        >
          <p className="text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8 lg:text-lg">
            {description || "Experience premium technology designed for what's next."}
          </p>
        </motion.div>
      );
    }

    if (activeTab === "features") {
      return (
        <motion.div
          key="features"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {normalizedFeatures.length > 0 ? (
            normalizedFeatures.map((feature, index) => {
              const label =
                typeof feature === "string"
                  ? feature
                  : feature.label || feature.name || `Feature ${index + 1}`;

              const value =
                typeof feature === "string"
                  ? null
                  : feature.value || feature.description;

              return (
                <motion.div
                  key={`${label}-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-[#2997FF]/40 hover:bg-white/[0.05]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0071E3]/10 text-[#2997FF]">
                    <Check size={18} />
                  </div>

                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    {label}
                  </h3>

                  {value && (
                    <p className="mt-2 text-xs leading-6 text-zinc-500 sm:text-sm">
                      {value}
                    </p>
                  )}
                </motion.div>
              );
            })
          ) : (
            <p className="text-sm text-zinc-500">
              No feature information available.
            </p>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        key="specifications"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
      >
        {normalizedSpecifications.length > 0 ? (
          <div className="divide-y divide-white/10">
            {normalizedSpecifications.map((spec, index) => {
              const label =
                typeof spec === "string"
                  ? spec
                  : spec.label ||
                    spec.name ||
                    spec.title ||
                    `Specification ${index + 1}`;

              const value =
                typeof spec === "string"
                  ? ""
                  : spec.value ??
                    spec.description ??
                    spec.detail ??
                    "";

              return (
                <motion.div
                  key={`${label}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                  }}
                  className="grid grid-cols-1 gap-2 px-4 py-4 sm:grid-cols-[minmax(140px,0.7fr)_minmax(0,1.3fr)] sm:px-6"
                >
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500 sm:text-sm">
                    {index % 3 === 0 && <Cpu size={15} />}
                    {index % 3 === 1 && <Database size={15} />}
                    {index % 3 === 2 && <Settings2 size={15} />}
                    <span>{formatLabel(label)}</span>
                  </div>

                  <div className="text-sm font-medium text-white sm:text-base">
                    {typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-sm text-zinc-500">
            No specification information available.
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <section className="w-full">
      <div className="mb-6 flex w-full overflow-x-auto border-b border-white/10 scrollbar-hide">
        <div className="flex min-w-max gap-1 sm:gap-2">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-xs font-medium transition-colors duration-300 sm:px-5 sm:text-sm ${
                  active
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Icon size={16} />

                <span>{label}</span>

                {active && (
                  <motion.span
                    layoutId="product-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#2997FF]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[180px]">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductTabs;