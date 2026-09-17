import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Apple } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const columns = [
    {
      title: "Products",
      links: [
        ["iPhone", "/products?category=iphone"],
        ["iPad", "/products?category=ipad"],
        ["Mac", "/products?category=mac"],
        ["Apple Watch", "/products?category=watch"],
        ["AirPods", "/products?category=airpods"],
      ],
    },
    {
      title: "Shopping",
      links: [
        ["All Products", "/products"],
        ["Wishlist", "/wishlist"],
        ["Cart", "/cart"],
        ["Orders", "/order-history"],
      ],
    },
    {
      title: "Support",
      links: [
        ["Search", "/search"],
        ["Track Order", "/track-order"],
        ["Contact", "/contact"],
        ["Privacy", "/privacy"],
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "#",
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "#",
    },
    {
      name: "X",
      icon: FaXTwitter,
      href: "#",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "#",
    },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-black">
      <div className="mx-auto w-full max-w-[2200px] px-4 xs:px-5 sm:px-8 lg:px-12 xl:px-16 3xl:px-24">
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10 lg:py-20">
          <div className="lg:col-span-2">
            <Link to="/" className="group inline-flex items-center gap-3">
              <motion.span
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
              >
                <Apple className="h-5 w-5 fill-current" />
              </motion.span>

              <span className="text-xl font-semibold tracking-tight text-white">
                iStore
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/45 sm:text-base">
              Designed for what’s next. Discover a premium collection of
              technology built around simplicity, performance, and iniStoretion.
            </p>

            <div className="mt-7 flex items-center gap-2">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <motion.a
                  key={name}
                  href={href}
                  aria-label={name}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-[#2997FF]/50 hover:bg-[#2997FF]/10 hover:text-[#2997FF]"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                {column.title}
              </h3>

              <div className="space-y-3">
                {column.links.map(([name, path]) => (
                  <Link
                    key={name}
                    to={path}
                    className="group flex items-center gap-1 text-sm text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {name}

                    <ArrowUpRight className="h-3 w-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.08] py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} iStore. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <Link
              to="/privacy"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="transition-colors duration-300 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;