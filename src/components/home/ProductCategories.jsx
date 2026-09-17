import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Headphones,
  Laptop,
  Smartphone,
  Tablet,
  Watch,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";

const categories = [
  {
    id: "iphone",
    name: "iPhone",
    description: "Powerful. Personal. Pro.",
    icon: Smartphone,
    path: "/products/iphone",
  },
  {
    id: "ipad",
    name: "iPad",
    description: "Versatility in every dimension.",
    icon: Tablet,
    path: "/products/ipad",
  },
  {
    id: "mac",
    name: "Mac",
    description: "Built for what you do.",
    icon: Laptop,
    path: "/products/mac",
  },
  {
    id: "watch",
    name: "Apple Watch",
    description: "A healthier way to live.",
    icon: Watch,
    path: "/products/watch",
  },
  {
    id: "airpods",
    name: "AirPods",
    description: "Sound that surrounds you.",
    icon: Headphones,
    path: "/products/airpods",
  },
];

const ProductCategories = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto w-full max-w-[2200px] px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 3xl:px-32">
        <SectionHeading
          subtitle="Explore the lineup"
          title="Everything you love. In one place."
        />

        <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-5 xl:gap-6 3xl:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
              >
                <Link
                  to={category.path}
                  className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[22px] border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-2 hover:border-apple-blue/30 hover:shadow-glow xs:min-h-[240px] xs:p-6 sm:min-h-[270px] md:min-h-[300px] md:rounded-[28px] md:p-7 xl:min-h-[340px] xl:p-9 3xl:min-h-[400px] 3xl:p-12"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-apple-blue/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-apple-blue transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-apple-blue/10 xs:h-12 xs:w-12 md:h-14 md:w-14">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>

                  <div className="relative z-10 mt-8">
                    <h3 className="text-lg font-semibold text-white xs:text-xl md:text-2xl xl:text-3xl">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-text-secondary xs:text-sm md:text-base">
                      {category.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-apple-blue md:text-sm">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                    </span>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-apple-blue"
                    transition={{ duration: 0.4 }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;