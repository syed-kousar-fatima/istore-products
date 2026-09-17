import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/products/ProductCard";
import { iphones, ipads, macbooks, watches, airpods } from "../data";

const Products = () => {
  const navigate = useNavigate();
  const { category: routeCategory } = useParams();
  const [searchParams] = useSearchParams();

  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500000);

  const queryCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const activeCategory = routeCategory || queryCategory || "all";

  const allProducts = useMemo(
    () => [...iphones, ...ipads, ...macbooks, ...watches, ...airpods],
    []
  );

  const normalizedCategory = activeCategory.toLowerCase();

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (normalizedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() === normalizedCategory
      );
    }

    if (searchQuery.trim()) {
      const search = searchQuery.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(search) ||
          product.category?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search)
        );
      });
    }

    result = result.filter((product) => {
      return Number(product.price) <= Number(maxPrice);
    });

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return result;
  }, [
    allProducts,
    normalizedCategory,
    searchQuery,
    maxPrice,
    sort,
  ]);

  const handleCategory = (category) => {
    if (!category || category === "all") {
      navigate("/products");
      return;
    }

    navigate(`/products/${category.toLowerCase()}`);
  };

  const categoryTitle = {
    all: "All Products",
    iphone: "iPhone",
    ipad: "iPad",
    mac: "Mac",
    watch: "Apple Watch",
    airpods: "AirPods",
  };

  const title =
    categoryTitle[normalizedCategory] ||
    `${activeCategory} Products`;

  return (
    <main className="min-h-screen bg-black px-4 py-24 text-white sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto w-full max-w-[2200px]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-apple-blue">
            iStore Store
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
            Explore the latest Apple technology, designed for performance,
            creativity, productivity, and everyday life.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#101010] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All"],
              ["iphone", "iPhone"],
              ["ipad", "iPad"],
              ["mac", "Mac"],
              ["watch", "Watch"],
              ["airpods", "AirPods"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => handleCategory(value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  normalizedCategory === value
                    ? "bg-white text-black"
                    : "bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-full border border-white/10 bg-[#151515] px-4 py-2 text-sm text-white outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="rounded-2xl border border-white/10 bg-[#101010] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Maximum Price</h3>
                    <p className="mt-1 text-sm text-white/45">
                      ₹{Number(maxPrice).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="5000"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(Number(event.target.value))
                  }
                  className="mt-5 w-full accent-[#0071E3]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-white/45">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[350px] items-center justify-center rounded-3xl border border-white/10 bg-[#101010]"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold">
                No products found
              </h2>

              <p className="mt-2 text-sm text-white/45">
                Try another category or adjust your filters.
              </p>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
              >
                View All Products
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Products;