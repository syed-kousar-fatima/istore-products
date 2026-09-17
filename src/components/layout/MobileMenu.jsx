import { motion } from "framer-motion";
import { ArrowUpRight, Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const MobileMenu = ({ links = [], onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl lg:hidden"
    >
      <div className="h-full overflow-y-auto px-4 xs:px-5 sm:px-8 pt-24 xs:pt-28 pb-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Explore
              </p>
              <h2 className="mt-1 text-2xl xs:text-3xl font-semibold text-white">
                Apple Ecosystem
              </h2>
            </div>
          </div>

          <div className="space-y-1">
            {links.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Link
                  to={link.path}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-white/[0.07] py-4 xs:py-5 sm:py-6"
                >
                  <span className="text-2xl xs:text-3xl sm:text-4xl font-semibold tracking-tight text-white transition group-hover:text-[#2997FF]">
                    {link.name}
                  </span>

                  <ArrowUpRight className="h-5 w-5 text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link
              to="/search"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70 transition hover:bg-white/[0.08] hover:text-white"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>

            <Link
              to="/cart"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70 transition hover:bg-white/[0.08] hover:text-white"
            >
              <ShoppingBag className="h-4 w-4" />
              Cart
            </Link>
          </div>

          <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#111] to-[#080808] p-5 sm:p-8">
            <p className="text-sm text-white/40">iStore</p>
            <p className="mt-2 text-xl sm:text-2xl font-medium text-white">
              Designed for what’s next.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;