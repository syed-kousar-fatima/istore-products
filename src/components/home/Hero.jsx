import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { iphones } from "../../data/iphones";
import AuroraBackground from "../ui/AuroraBackground";
import FloatingElements from "../ui/FloatingElements";
import Spotlight from "../ui/Spotlight";
import AnimatedText from "../ui/AnimatedText";

const Hero = () => {
  const product = iphones?.[0];

  if (!product) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-background xs:min-h-[820px] sm:min-h-[860px] md:min-h-[800px] lg:min-h-[850px] xl:min-h-[920px] 2xl:min-h-[980px] 3xl:min-h-[1100px]">
      <AuroraBackground
        className="absolute inset-0"
        intensity="strong"
      />

      <FloatingElements
        elements={[
          {
            top: "18%",
            left: "8%",
            size: 5,
            delay: 0,
          },
          {
            top: "28%",
            right: "10%",
            size: 4,
            delay: 1,
          },
          {
            bottom: "20%",
            left: "15%",
            size: 6,
            delay: 2,
          },
          {
            bottom: "18%",
            right: "18%",
            size: 4,
            delay: 3,
          },
        ]}
        className="absolute inset-0 z-0"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,113,227,0.14),transparent_42%)]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-apple-blue/[0.06] blur-[120px] sm:h-[650px] sm:w-[650px] xl:h-[850px] xl:w-[850px]" />

      <div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-[2200px] items-center px-4 py-24 xs:min-h-[820px] xs:px-5 sm:min-h-[860px] sm:px-8 md:min-h-[800px] md:px-10 md:py-20 lg:min-h-[850px] lg:px-14 xl:min-h-[920px] xl:px-20 2xl:min-h-[980px] 2xl:px-24 3xl:min-h-[1100px] 3xl:px-32">
        <div className="grid w-full items-center gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-10 xl:gap-20 3xl:gap-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl text-center lg:text-left"
          >
            <motion.div
              variants={textVariants}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-4 py-2 text-[11px] font-medium text-text-secondary backdrop-blur-xl xs:text-xs sm:text-sm"
            >
              <motion.span
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-4 w-4 text-apple-blue" />
              </motion.span>

              The future is here
            </motion.div>

            <motion.div variants={textVariants}>
              <AnimatedText
                text="Meet the next generation."
                mode="words"
                className="hero-title mx-auto max-w-4xl text-white lg:mx-0"
                delay={0.1}
                stagger={0.1}
              />
            </motion.div>

            <motion.p
              variants={textVariants}
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-text-secondary xs:text-base md:text-lg md:leading-8 lg:mx-0 xl:text-xl 3xl:text-2xl"
            >
              Discover powerful technology designed to fit seamlessly into
              your everyday life. Experience performance, iniStoretion and
              effortless design with iStore.
            </motion.p>

            <motion.div
              variants={textVariants}
              className="mt-8 flex flex-col items-center justify-center gap-3 xs:flex-row lg:justify-start"
            >
              <Link
                to={`/product/${product.id}`}
                className="apple-button group inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 text-sm font-semibold xs:w-auto md:px-8 md:text-base"
              >
                <span>Buy Now</span>

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/products"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-white/[0.03] px-6 text-sm font-semibold text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] xs:w-auto md:px-8 md:text-base"
              >
                <span>Explore Products</span>

                <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            </motion.div>

            <motion.div
              variants={textVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-text-muted xs:text-xs sm:gap-6 sm:text-sm lg:justify-start"
            >
              <span>Free shipping</span>

              <span className="h-1 w-1 rounded-full bg-text-muted" />

              <span>Secure checkout</span>

              <span className="h-1 w-1 rounded-full bg-text-muted" />

              <span>Premium support</span>
            </motion.div>
          </motion.div>

          <Spotlight
            className="relative mx-auto w-full max-w-[700px]"
            size={500}
            color="rgba(0,113,227,0.2)"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.65,
                y: 90,
                rotateX: 18,
                filter: "blur(14px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.25,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex min-h-[410px] items-center justify-center xs:min-h-[450px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[600px] xl:min-h-[680px] 2xl:min-h-[760px] 3xl:min-h-[850px]"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.18, 0.32, 0.18],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-[48%] w-[48%] rounded-full bg-apple-blue blur-[90px] xs:h-[52%] xs:w-[52%] sm:blur-[110px] xl:blur-[140px]"
              />

              <motion.div
                animate={{
                  y: [0, -14, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-[62%] max-w-[420px] xs:w-[60%] sm:w-[56%] md:w-[54%] lg:w-[64%] xl:w-[58%] 2xl:max-w-[500px]"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(0,113,227,0)",
                      "0 0 45px rgba(0,113,227,0.22)",
                      "0 0 0 rgba(0,113,227,0)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative rounded-[2rem] xs:rounded-[2.4rem] sm:rounded-[2.8rem] md:rounded-[3rem] xl:rounded-[3.5rem]"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-[2px] rounded-[2rem] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(41,151,255,0.9)_80deg,transparent_150deg,rgba(255,255,255,0.5)_230deg,transparent_310deg)] xs:rounded-[2.4rem] sm:-inset-[3px] sm:rounded-[2.8rem] md:rounded-[3rem] xl:rounded-[3.5rem]"
                  />

                  <div className="absolute -inset-[5px] rounded-[2.1rem] border border-white/10 bg-black/30 blur-[1px] xs:rounded-[2.5rem] sm:-inset-[6px] sm:rounded-[2.9rem] md:rounded-[3.1rem] xl:rounded-[3.6rem]" />

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-black/70 p-[3px] shadow-[0_35px_100px_rgba(0,0,0,0.75)] backdrop-blur-xl xs:rounded-[2.4rem] xs:p-1 sm:rounded-[2.8rem] sm:p-1.5 md:rounded-[3rem] xl:rounded-[3.5rem]">
                    <div className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-[#080808] xs:rounded-[2.2rem] sm:rounded-[2.6rem] md:rounded-[2.8rem] xl:rounded-[3.3rem]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(41,151,255,0.18),transparent_58%)]" />

                      <motion.div
                        animate={{
                          x: ["-120%", "120%"],
                        }}
                        transition={{
                          duration: 3.8,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeInOut",
                        }}
                        className="pointer-events-none absolute inset-y-0 z-20 w-[35%] -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-md"
                      />

                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
                        whileHover={{
                          scale: 1.045,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                      />

                      <motion.div
                        animate={{
                          opacity: [0.2, 0.55, 0.2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="pointer-events-none absolute inset-0 z-30 rounded-[1.8rem] border border-apple-blue/60 xs:rounded-[2.2rem] sm:rounded-[2.6rem] md:rounded-[2.8rem] xl:rounded-[3.3rem]"
                      />
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.04, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-8 -z-10 rounded-[4rem] bg-apple-blue/20 blur-3xl xs:-inset-10 sm:-inset-12"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  x: 50,
                  scale: 0.9,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-[8%] right-0 z-30 hidden w-[190px] rounded-2xl border border-white/10 bg-black/60 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:block md:w-[220px] md:p-5 xl:w-[260px] 2xl:w-[280px]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-apple-blue" />

                  <span className="text-xs text-text-secondary">
                    Featured
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white md:text-base">
                  {product.name}
                </h3>

                <p className="mt-1 text-xs text-text-muted md:text-sm">
                  Starting at ₹
                  {Number(product.price || 0).toLocaleString("en-IN")}
                </p>
              </motion.div>
            </motion.div>
          </Spotlight>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{
          duration: 1.2,
          delay: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-0 left-1/2 h-px w-[75%] max-w-[1400px] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </section>
  );
};

export default Hero;