
import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Headphones,
  Lock,
  Recycle,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import GlassCard from "../ui/GlassCard";

const benefits = [
  {
    icon: Sparkles,
    title: "Beautiful design",
    description:
      "Thoughtful details, premium materials and a clean experience from every angle.",
  },
  {
    icon: Cpu,
    title: "Powerful performance",
    description:
      "Advanced hardware built to handle demanding work, creativity and entertainment.",
  },
  {
    icon: ShieldCheck,
    title: "Built for reliability",
    description:
      "A carefully integrated experience designed around security, privacy and longevity.",
  },
  {
    icon: Lock,
    title: "Privacy focused",
    description:
      "Your personal information deserves strong protection at every step.",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    description:
      "Enjoy convenient delivery and real-time order tracking after checkout.",
  },
  {
    icon: Recycle,
    title: "A thoughtful future",
    description:
      "Choose products designed with long-term use and a more responsible future in mind.",
  },
];

const WhyApple = () => {
  return (
    <section className="section-padding bg-background">
      <div className="mx-auto w-full max-w-[2200px] px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 3xl:px-32">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-apple-blue sm:text-sm"
          >
            The iStore experience
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-bold tracking-tight text-white xs:text-4xl md:text-5xl xl:text-6xl 3xl:text-7xl"
          >
            Technology with purpose.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm leading-7 text-text-secondary md:text-base xl:text-lg"
          >
            Everything about the experience is designed to make powerful
            technology feel simple, intuitive and personal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-6 3xl:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
              >
                <GlassCard
                  className="h-full min-h-[190px] p-5 xs:min-h-[210px] xs:p-6 md:min-h-[230px] md:p-7 xl:min-h-[270px] xl:p-8 3xl:min-h-[310px] 3xl:p-10"
                  hover
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-apple-blue/10 text-apple-blue xs:h-12 xs:w-12 md:h-14 md:w-14">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>

                  <h3 className="mt-6 text-base font-semibold text-white xs:text-lg md:text-xl xl:text-2xl">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-text-secondary xs:text-sm md:text-base">
                    {benefit.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyApple;