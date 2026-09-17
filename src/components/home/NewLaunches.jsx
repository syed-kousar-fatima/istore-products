
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { iphones } from "../../data/iphones";
import { ipads } from "../../data/ipads";
import { macbooks } from "../../data/macbooks";
import { formatPrice } from "../../utils/formatPrice";

const NewLaunches = () => {
  const products = [
    ...(iphones || []),
    ...(ipads || []),
    ...(macbooks || []),
  ]
    .filter(
      (product) =>
        product?.badge === "new" ||
        product?.badge === "New" ||
        product?.isNew
    )
    .slice(0, 3);

  const fallbackProducts = [
    ...(iphones || []),
    ...(ipads || []),
    ...(macbooks || []),
  ].slice(0, 3);

  const launchProducts =
    products.length >= 3 ? products : fallbackProducts;

  if (!launchProducts.length) return null;

  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto w-full max-w-[2200px] px-4 xs:px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-24 3xl:px-32">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-apple-blue/20 bg-apple-blue/10 px-3 py-1.5 text-xs font-medium text-apple-blue">
              <Sparkles className="h-3.5 w-3.5" />
              New arrivals
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white xs:text-4xl md:text-5xl xl:text-6xl 3xl:text-7xl">
              Meet what’s next.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:text-base xl:text-lg">
              Fresh releases, refined performance and new ways to
              experience your favorite technology.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-apple-blue md:text-base"
          >
            Discover more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 xl:gap-8">
          {launchProducts.map((product, index) => (
            <motion.div
              key={product.id || `${product.name}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
              }}
              className="group"
            >
              <Link
                to={`/product/${product.id}`}
                className="relative flex min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/10 hover:shadow-card xs:min-h-[480px] xs:p-8 md:min-h-[520px] xl:min-h-[620px] xl:rounded-[32px] xl:p-10 3xl:min-h-[720px] 3xl:p-12"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-apple-blue">
                    {product.category}
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-white xs:text-3xl xl:text-4xl 3xl:text-5xl">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-text-secondary md:text-base">
                    {product.description ||
                      "Powerful technology. Beautifully designed."}
                  </p>
                </div>

                <motion.div
                  className="relative z-10 mt-auto flex flex-1 items-center justify-center py-8"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[250px] w-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] xs:max-h-[280px] md:max-h-[300px] xl:max-h-[370px] 3xl:max-h-[450px]"
                  />
                </motion.div>

                <div className="relative z-10 flex items-center justify-between border-t border-border pt-5">
                  <div>
                    <span className="text-xs text-text-muted">
                      Starting at
                    </span>
                    <p className="mt-1 text-lg font-semibold text-white md:text-xl xl:text-2xl">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-apple-blue text-white transition-transform group-hover:scale-110 md:h-11 md:w-11">
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewLaunches;