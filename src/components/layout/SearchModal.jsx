import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchModal = ({
  open = false,
  onClose = () => {},
  products = [],
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const filteredProducts = products
    .filter((product) =>
      `${product.name || ""} ${product.category || ""}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .slice(0, 6);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/80 px-3 xs:px-4 pt-4 sm:pt-10 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#101010]/95 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 sm:px-6">
              <Search className="h-5 w-5 shrink-0 text-white/40" />

              <input
                autoFocus
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products..."
                className="h-16 min-w-0 flex-1 bg-transparent text-base sm:text-lg text-white outline-none placeholder:text-white/30"
              />

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-3 sm:p-4">
              {query && filteredProducts.length > 0 ? (
                <div className="space-y-1">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-white/[0.06]"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.05]">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-medium text-white">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-xs text-white/40">
                          {product.category}
                        </p>
                      </div>

                      <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </Link>
                  ))}
                </div>
              ) : query ? (
                <div className="px-4 py-12 text-center">
                  <Search className="mx-auto h-8 w-8 text-white/20" />
                  <p className="mt-4 text-sm text-white/50">
                    No products found for “{query}”
                  </p>
                </div>
              ) : (
                <div className="px-2 py-4">
                  <p className="mb-4 px-2 text-xs uppercase tracking-[0.2em] text-white/30">
                    Popular searches
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "iPhone",
                      "iPad",
                      "MacBook",
                      "Apple Watch",
                      "AirPods",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;