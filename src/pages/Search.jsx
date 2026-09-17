import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import {
  iphones,
  ipads,
  macbooks,
  watches,
  airpods,
} from "../data";
import { filterProducts } from "../utils/helpers";

const Search = ({
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const products = useMemo(
    () => [
      ...iphones,
      ...ipads,
      ...macbooks,
      ...watches,
      ...airpods,
    ],
    []
  );

  const results = useMemo(
    () =>
      filterProducts(products, {
        search: query,
        category: "All",
      }),
    [products, query]
  );

  return (
    <main className="min-h-screen bg-background">
      <section className="page-padding pt-28 xs:pt-24 md:pt-32 xl:pt-40">
        <div className="mx-auto w-full max-w-[2200px]">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card">
              <SearchIcon className="h-7 w-7 text-apple-light" />
            </div>

            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-apple-light">
              iStore SEARCH
            </p>

            <h1 className="mt-3 break-words text-3xl font-bold text-white md:text-5xl">
              {query ? `Results for "${query}"` : "Search Products"}
            </h1>

            <p className="mt-4 text-sm text-text-secondary md:text-base">
              {query
                ? `${results.length} products found`
                : "Find your next favorite iStore product."}
            </p>
          </div>

          {!query ? (
            <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "iPhone",
                "MacBook",
                "iPad Pro",
                "Apple Watch",
                "AirPods",
              ].map((item) => (
                <Link
                  key={item}
                  to={`/search?q=${encodeURIComponent(item)}`}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-apple-blue/50"
                >
                  <span className="text-sm font-medium text-white">
                    {item}
                  </span>
                  <ArrowRight className="h-4 w-4 text-text-muted transition group-hover:translate-x-1 group-hover:text-apple-light" />
                </Link>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.05, 0.4),
                  }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-12 flex min-h-[300px] max-w-2xl flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 text-center">
              <SearchIcon className="h-10 w-10 text-text-muted" />
              <h2 className="mt-5 text-xl font-semibold text-white">
                No matching products
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Try searching for iPhone, iPad, Mac, Watch, or AirPods.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-apple-blue px-6 py-3 text-sm font-medium text-white"
              >
                Browse All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Search;