
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Send } from "lucide-react";
import AuroraBackground from "../ui/AuroraBackground";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-surface py-20 xs:py-24 md:py-32 xl:py-40 3xl:py-52">
      <AuroraBackground
        className="absolute inset-0"
        intensity="soft"
      />

      <div className="relative z-10 mx-auto w-full max-w-[2200px] px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 3xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-apple-blue/20 bg-apple-blue/10 text-apple-blue md:h-14 md:w-14">
            <Mail className="h-5 w-5 md:h-6 md:w-6" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white xs:text-4xl md:text-5xl xl:text-6xl 3xl:text-7xl">
            Stay in the loop.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:text-base xl:text-lg">
            Get updates about new products, exclusive offers and the latest
            iStore experiences delivered to your inbox.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="h-12 w-full rounded-full border border-border bg-black/40 pl-11 pr-5 text-sm text-white outline-none transition placeholder:text-text-muted focus:border-apple-blue/60 focus:ring-2 focus:ring-apple-blue/20 md:h-14 md:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="apple-button inline-flex h-12 items-center justify-center gap-2 px-6 text-sm font-semibold md:h-14 md:px-8 md:text-base"
                >
                  Subscribe
                  <Send className="h-4 w-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-3 rounded-full border border-green-400/20 bg-green-400/10 px-5 py-4 text-sm text-green-300"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-400/20">
                  <Check className="h-4 w-4" />
                </span>
                You're subscribed. Thanks for joining iStore.
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-red-400 md:text-sm"
            >
              {error}
            </motion.p>
          )}

          <p className="mt-5 text-[10px] leading-5 text-text-muted xs:text-xs">
            By subscribing, you agree to receive iStore updates. You can
            unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;