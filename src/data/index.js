import iphones from "./iphones";
import ipads from "./ipads";
import macbooks from "./macbooks";
import watches from "./watches";
import airpods from "./airpods";
import featured, { allProducts } from "./featured";
import paymentMethods from "./paymentMethods";

const productCategories = [
  {
    id: "iphone",
    name: "iPhone",
    slug: "iphone",
    description: "Powerful smartphones designed around you.",
    products: iphones,
  },
  {
    id: "ipad",
    name: "iPad",
    slug: "ipad",
    description: "Powerful, versatile, and ready for anything.",
    products: ipads,
  },
  {
    id: "mac",
    name: "Mac",
    slug: "mac",
    description: "Unleash your creativity with Mac.",
    products: macbooks,
  },
  {
    id: "watch",
    name: "Apple Watch",
    slug: "watch",
    description: "Powerful health and fitness technology on your wrist.",
    products: watches,
  },
  {
    id: "airpods",
    name: "AirPods",
    slug: "airpods",
    description: "Immersive sound that moves with you.",
    products: airpods,
  },
];

const categoryProducts = {
  iphone: iphones,
  ipad: ipads,
  mac: macbooks,
  watch: watches,
  airpods,
};

export {
  iphones,
  ipads,
  macbooks,
  watches,
  airpods,
  featured,
  allProducts,
  paymentMethods,
  productCategories,
  categoryProducts,
};

export default allProducts;