export const APP_NAME = "NOVA";

export const APP_TAGLINE = "Designed for what's next.";

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  IPHONE: "/iphone",
  IPAD: "/ipad",
  MAC: "/mac",
  WATCH: "/watch",
  AIRPODS: "/airpods",
  CART: "/cart",
  WISHLIST: "/wishlist",
  SEARCH: "/search",
  CHECKOUT: "/checkout",
  ORDER_CONFIRMATION: "/order-confirmation",
  ORDER_HISTORY: "/order-history",
  TRACK_ORDER: "/track-order",
};

export const PRODUCT_CATEGORIES = [
  {
    id: "iphone",
    name: "iPhone",
    slug: "iphone",
    route: "/products?category=iphone",
  },
  {
    id: "ipad",
    name: "iPad",
    slug: "ipad",
    route: "/products?category=ipad",
  },
  {
    id: "mac",
    name: "Mac",
    slug: "mac",
    route: "/products?category=mac",
  },
  {
    id: "watch",
    name: "Apple Watch",
    slug: "watch",
    route: "/products?category=watch",
  },
  {
    id: "airpods",
    name: "AirPods",
    slug: "airpods",
    route: "/products?category=airpods",
  },
];

export const ORDER_STATUS = {
  PLACED: "placed",
  CONFIRMED: "confirmed",
  PREPARING: "preparing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const ORDER_STATUS_LABELS = {
  placed: "Order Placed",
  confirmed: "Order Confirmed",
  preparing: "Preparing Order",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_METHODS = {
  CARD: "card",
  UPI: "upi",
  WALLET: "wallet",
  COD: "cod",
};

export const TAX_RATE = 0.08;

export const FREE_SHIPPING_THRESHOLD = 0;

export const SHIPPING_COST = 0;

export const COUPONS = {
  NOVA10: {
    code: "NOVA10",
    type: "percentage",
    value: 10,
    label: "10% off",
  },
  SAVE20: {
    code: "SAVE20",
    type: "fixed",
    value: 20,
    label: "$20 off",
  },
};

export const STORAGE_KEY = {
  CART: "nova-cart",
  WISHLIST: "nova-wishlist",
  ORDERS: "nova-orders",
  THEME: "nova-theme",
  LAST_ORDER: "nova-last-order",
};

export const NAV_ITEMS = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "iPhone",
    path: "/products?category=iphone",
  },
  {
    label: "iPad",
    path: "/products?category=ipad",
  },
  {
    label: "Mac",
    path: "/products?category=mac",
  },
  {
    label: "Watch",
    path: "/products?category=watch",
  },
  {
    label: "AirPods",
    path: "/products?category=airpods",
  },
];

export const SEARCH_SUGGESTIONS = [
  "iPhone 17 Pro Max",
  "MacBook Air",
  "iPad Pro",
  "Apple Watch",
  "AirPods Pro",
];

export const RESPONSIVE_MAX_WIDTH = "2200px";

export const BREAKPOINTS = {
  xs: 320,
  xsm: 375,
  smd: 425,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1440,
  "2xl": 1920,
  "3xl": 2560,
};

export const APP_CONFIG = {
  name: APP_NAME,
  tagline: APP_TAGLINE,
  currency: "USD",
  locale: "en-US",
  taxRate: TAX_RATE,
  shipping: SHIPPING_COST,
};