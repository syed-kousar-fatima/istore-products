
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
import AuroraBackground from "../ui/AuroraBackground";
import GlowCard from "../ui/GlowCard";

const ecosystem = [
  {
    name: "iPhone",
    icon: Smartphone,
    description: "Powerful performance in your pocket.",
    path: "/products?category=iphone",
  },
  {
    name: "iPad",
    icon: Tablet,
    description: "Your creativity, anywhere.",
    path: "/products?category=ipad",
  },
  {
    name: "Mac",
    icon: Laptop,
    description: "Desktop-class power.",
    path: "/products?category=mac",
  },
  {
    name: "Watch",
    icon: Watch,
    description: "More connected every day.",
    path: "/products?category=watch",
  },
  {
    name: "AirPods",
    icon: Headphones,
    description: "Immersive sound.",
    path: "/products?category=airpods",
  },
];

const AppleEcosystem = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 xs:py-24 md:py-32 xl:py-40 3xl:py-52">
      <AuroraBackground
        className="absolute inset-0"
        intensity="medium"
      />

      <div className="relative z-10 mx-auto w-full max-w-[2200px] px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 3xl:px-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-apple-blue sm:text-sm"
          >
            One connected experience
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-bold tracking-tight text-white xs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl"
          >
            Your devices.
            <span className="block text-gradient">
              Working beautifully together.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base md:leading-8 xl:text-lg 3xl:text-xl"
          >
            Build an ecosystem that keeps your work, entertainment,
            communication and everyday life effortlessly connected.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 xl:mt-16 xl:gap-6">
          {ecosystem.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.92, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <GlowCard
                  className="h-full min-h-[190px] p-5 xs:min-h-[210px] xs:p-6 md:min-h-[240px] md:p-7 xl:min-h-[280px] xl:p-8"
                  intensity="soft"
                >
                  <Link
                    to={item.path}
                    className="flex h-full flex-col"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white xs:h-12 xs:w-12 md:h-14 md:w-14">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>

                    <div className="mt-auto pt-8">
                      <h3 className="text-base font-semibold text-white xs:text-lg md:text-xl xl:text-2xl">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-text-secondary md:text-sm md:leading-6">
                        {item.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-apple-blue md:text-sm">
                        Explore
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppleEcosystem;