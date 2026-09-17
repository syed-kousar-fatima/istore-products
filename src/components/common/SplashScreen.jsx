import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Apple, BatteryCharging, Zap } from "lucide-react";

const SplashScreen = ({ duration = 5000, onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: {
              duration: 0.7,
              ease: "easeInOut",
            },
          }}
          className="fixed inset-0 z-[9999] flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,113,227,0.16),transparent_38%)]" />

          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0071E3] blur-[90px]"
          />

          <div className="relative flex h-full w-full items-center justify-center">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.45,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.45, 1, 1, 0.7],
              }}
              transition={{
                duration: 1.7,
                times: [0, 0.25, 0.7, 1],
                ease: "easeInOut",
              }}
              className="absolute z-30 flex h-24 w-24 items-center justify-center rounded-full sm:h-28 sm:w-28"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,113,227,0.1)",
                    "0 0 80px rgba(0,113,227,0.45)",
                    "0 0 30px rgba(0,113,227,0.1)",
                  ],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white text-black sm:h-24 sm:w-24"
              >
                <Apple
                  className="h-10 w-10 fill-current sm:h-12 sm:w-12"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{
                y: "-70vh",
                opacity: 0,
                rotateX: 70,
                rotateY: -35,
                rotateZ: -20,
                scale: 0.6,
              }}
              animate={{
                y: [
                  "-70vh",
                  "-32vh",
                  18,
                  -7,
                  0,
                  0,
                ],
                opacity: [0, 1, 1, 1, 1, 1],
                rotateX: [70, 35, 12, -4, 0, 0],
                rotateY: [-35, 20, -10, 4, 0, 0],
                rotateZ: [-20, 12, -6, 2, 0, 360],
                scale: [0.6, 0.7, 0.8, 0.9, 1, 0.72],
              }}
              transition={{
                duration: 4.15,
                times: [0, 0.23, 0.53, 0.7, 0.82, 1],
                ease: [
                  "easeIn",
                  "easeOut",
                  "easeInOut",
                  "easeOut",
                  "easeInOut",
                ],
              }}
              className="absolute z-20"
              style={{
                perspective: 1400,
              }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(0,113,227,0)",
                    "0 25px 70px rgba(0,113,227,0.18)",
                    "0 30px 100px rgba(0,113,227,0.4)",
                    "0 0 30px rgba(0,113,227,0.12)",
                  ],
                }}
                transition={{
                  duration: 4.15,
                  ease: "easeInOut",
                }}
                className="relative h-[300px] w-[150px] overflow-hidden rounded-[34px] border-[3px] border-[#3a3a3c] bg-[#111] shadow-2xl xs:h-[340px] xs:w-[170px] sm:h-[400px] sm:w-[200px]"
              >
                <div className="absolute inset-[5px] overflow-hidden rounded-[29px] bg-black">

                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(41,151,255,0.55),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(0,113,227,0.28),transparent_45%)]"
                  />

                  <div className="absolute left-1/2 top-2 h-6 w-20 -translate-x-1/2 rounded-full bg-black sm:h-7 sm:w-24" />

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0.7],
                      scale: [0.7, 1, 1.08, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.4,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-[34%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_0_45px_rgba(255,255,255,0.2)] sm:h-16 sm:w-16">
                      <Apple
                        className="h-7 w-7 fill-current sm:h-8 sm:w-8"
                        strokeWidth={1.5}
                      />
                    </div>

                    <motion.div
                      animate={{
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mt-3 flex items-center gap-1.5"
                    >
                      <Zap className="h-3 w-3 fill-[#2997FF] text-[#2997FF]" />
                      <span className="text-[9px] font-medium tracking-widest text-white/70">
                        CHARGING
                      </span>
                    </motion.div>
                  </motion.div>

                  <div className="absolute bottom-[22%] left-1/2 w-[72%] -translate-x-1/2">
                    <div className="mb-2 flex items-center justify-between text-[8px] text-white/40">
                      <span>Battery</span>
                      <span>100%</span>
                    </div>

                    <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 3.3,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-[#2997FF]"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-white/50" />
                    <div className="h-1 w-1 rounded-full bg-white/30" />
                    <div className="h-1 w-1 rounded-full bg-white/20" />
                  </div>
                </div>

                <div className="absolute left-[-4px] top-20 h-10 w-[3px] rounded-l-full bg-[#555]" />

                <div className="absolute right-[-4px] top-28 h-16 w-[3px] rounded-r-full bg-[#555]" />

                <div className="absolute right-[-4px] top-20 h-7 w-[3px] rounded-r-full bg-[#555]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: [0, 0, 0, 1, 1],
                y: [35, 35, 35, 0, 0],
              }}
              transition={{
                duration: 4.25,
                times: [0, 0.45, 0.66, 0.82, 1],
                ease: "easeOut",
              }}
              className="absolute bottom-[15%] z-40 text-center"
            >
              <h1 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl md:text-5xl">
                iStore
              </h1>

              <p className="mt-2 text-[9px] uppercase tracking-[0.32em] text-white/40 sm:text-[10px]">
                Designed for what's next.
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              animate={{
                opacity: [0, 0, 1, 1],
                scaleX: [0, 0, 1, 1],
              }}
              transition={{
                duration: 4.5,
                times: [0, 0.6, 0.84, 1],
                ease: "easeOut",
              }}
              className="absolute bottom-[10%] z-40 h-[2px] w-28 overflow-hidden rounded-full bg-white/10 sm:w-32"
            >
              <motion.div
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "100%",
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-[#2997FF]"
              />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0, 0, 0.7, 0],
              }}
              transition={{
                duration: 4.5,
                times: [0, 0.4, 0.65, 0.82, 1],
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute bottom-[7%] flex items-center gap-1 text-[8px] uppercase tracking-[0.25em] text-white/30"
            >
              <BatteryCharging className="h-3 w-3" />
              Powering up
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;