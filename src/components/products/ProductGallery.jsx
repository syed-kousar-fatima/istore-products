import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState } from "react";

const ProductGallery = ({ images = [], name = "Product" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const currentImage = images[activeIndex];

  const nextImage = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  if (!images.length) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[28px] bg-[#111] text-white/30">
        No image available
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative aspect-square overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-[#101010]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={name}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: zoom ? 1.2 : 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45 }}
              className="relative h-full w-full object-contain p-8 xs:p-10 sm:p-14 md:p-16 lg:p-20"
            />
          </AnimatePresence>

          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:left-5 sm:h-11 sm:w-11"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:right-5 sm:h-11 sm:w-11"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setZoom((value) => !value)}
            aria-label="Zoom image"
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:bottom-5 sm:right-5 sm:h-11 sm:w-11"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 xs:gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`aspect-square overflow-hidden rounded-xl sm:rounded-2xl border bg-[#101010] transition-all duration-300 ${
                activeIndex === index
                  ? "border-white"
                  : "border-white/[0.08] hover:border-white/30"
              }`}
            >
              <img
                src={image}
                alt={`${name} ${index + 1}`}
                className="h-full w-full object-contain p-2 sm:p-3 transition-transform duration-300 hover:scale-110"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGallery;