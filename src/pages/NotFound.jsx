import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Home as HomeIcon,
  Search,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 pt-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-apple-blue/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[7rem] font-black leading-none tracking-[-0.08em] text-white xs:text-[8rem] sm:text-[11rem] md:text-[14rem]"
        >
          404
        </motion.div>

        <div className="mx-auto mt-2 h-px w-24 bg-apple-blue sm:w-32" />

        <h1 className="mt-7 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          This page could not be found.
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-text-secondary md:text-base">
          The page may have moved, been removed, or the URL may be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-white transition hover:border-white/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-full bg-apple-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-apple-light"
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>

          <Link
            to="/search"
            className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-white transition hover:border-apple-blue/50"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default NotFound;