import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Apple,
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const Navbar = ({ cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "iPhone",
      path: "/products/iphone",
    },
    {
      name: "iPad",
      path: "/products/ipad",
    },
    {
      name: "Mac",
      path: "/products/mac",
    },
    {
      name: "Watch",
      path: "/products/watch",
    },
    {
      name: "AirPods",
      path: "/products/airpods",
    },
  ];

  const closeMenus = () => {
    setMenuOpen(false);
    setProductsOpen(false);
  };

  const handleSearch = () => {
    closeMenus();
    navigate("/search");
  };

  const handleCart = () => {
    closeMenus();
    navigate("/cart");
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-[100] px-2 xs:px-3 sm:px-4 lg:px-6 xl:px-8"
      >
        <div className="mx-auto mt-2 max-w-[2200px] sm:mt-3">
          <nav className="relative flex h-14 items-center justify-between rounded-2xl border border-white/[0.08] bg-black/75 px-3 backdrop-blur-2xl xs:h-16 xs:px-4 sm:h-[68px] sm:px-6 lg:h-[72px] lg:px-8">
            <Link
              to="/"
              onClick={closeMenus}
              className="group flex shrink-0 items-center gap-2"
              aria-label="iStore Home"
            >
              <motion.span
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black xs:h-9 xs:w-9 sm:h-10 sm:w-10"
              >
                <Apple className="h-4 w-4 fill-current xs:h-5 xs:w-5" />
              </motion.span>

              <span className="hidden xsm:block">
                <span className="block text-sm font-semibold tracking-tight text-white sm:text-base lg:text-lg">
                  iStore
                </span>

                <span className="hidden text-[9px] uppercase tracking-[0.18em] text-white/45 lg:block">
                  Designed for what's next
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex xl:gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMenus}
                  className={({ isActive }) =>
                    `relative rounded-full px-3 py-2 text-xs transition-all duration-300 xl:px-4 2xl:px-5 xl:text-sm 2xl:text-[15px] ${
                      isActive
                        ? "text-white"
                        : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}

                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#2997FF]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProductsOpen((value) => !value)}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-xs text-white/55 transition hover:bg-white/[0.06] hover:text-white xl:px-4 xl:text-sm 2xl:text-[15px]"
                >
                  More

                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      productsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        scale: 0.96,
                      }}
                      className="absolute right-0 top-full mt-3 w-52 rounded-2xl border border-white/10 bg-[#111]/95 p-2 shadow-2xl backdrop-blur-2xl"
                    >
                      <Link
                        to="/wishlist"
                        onClick={closeMenus}
                        className="block rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        Wishlist
                      </Link>

                      <Link
                        to="/order-history"
                        onClick={closeMenus}
                        className="block rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        Orders
                      </Link>

                      <Link
                        to="/track-order"
                        onClick={closeMenus}
                        className="block rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        Track Order
                      </Link>

                      <button
                        type="button"
                        onClick={handleSearch}
                        className="block w-full rounded-xl px-4 py-3 text-left text-sm text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        Search Products
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleSearch}
                aria-label="Search"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-all hover:bg-white/[0.08] hover:text-white xs:h-10 xs:w-10 sm:h-11 sm:w-11"
              >
                <Search className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
              </button>

              <motion.button
                type="button"
                onClick={handleCart}
                aria-label={`Shopping cart with ${cartCount} items`}
                whileTap={{ scale: 0.9 }}
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-all hover:bg-white/[0.08] hover:text-white xs:h-10 xs:w-10 sm:h-11 sm:w-11"
              >
                <ShoppingBag className="h-[18px] w-[18px] sm:h-5 sm:w-5" />

                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#0071E3] px-1 text-[9px] font-bold leading-none text-white shadow-[0_0_12px_rgba(0,113,227,0.55)] sm:min-h-5 sm:min-w-5 sm:text-[10px]"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((value) => !value)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/[0.08] xs:h-10 xs:w-10 lg:hidden"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{
                        rotate: -90,
                        opacity: 0,
                      }}
                      animate={{
                        rotate: 0,
                        opacity: 1,
                      }}
                      exit={{
                        rotate: 90,
                        opacity: 0,
                      }}
                    >
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{
                        rotate: 90,
                        opacity: 0,
                      }}
                      animate={{
                        rotate: 0,
                        opacity: 1,
                      }}
                      exit={{
                        rotate: -90,
                        opacity: 0,
                      }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            links={links}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;