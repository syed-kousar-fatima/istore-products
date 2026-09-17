export const cn = (...classes) => {
  return classes
    .flat(Infinity)
    .filter(Boolean)
    .join(" ");
};

export const slugify = (value = "") => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const capitalize = (value = "") => {
  const text = String(value);

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const truncate = (
  value = "",
  length = 100
) => {
  const text = String(value);

  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length).trim()}...`;
};

export const clamp = (
  value,
  min,
  max
) => {
  return Math.min(Math.max(value, min), max);
};

export const debounce = (
  callback,
  delay = 300
) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const throttle = (
  callback,
  limit = 100
) => {
  let waiting = false;

  return (...args) => {
    if (waiting) {
      return;
    }

    callback(...args);
    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, limit);
  };
};

export const isBrowser = () => {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined"
  );
};

export const getRandomId = (prefix = "id") => {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};

export const getInitials = (name = "") => {
  return String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const safeJsonParse = (
  value,
  fallback = null
) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const scrollToElement = (
  selector,
  offset = 0
) => {
  if (!isBrowser()) {
    return;
  }

  const element =
    typeof selector === "string"
      ? document.querySelector(selector)
      : selector;

  if (!element) {
    return;
  }

  const top =
    element.getBoundingClientRect().top +
    window.scrollY -
    offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};

export const scrollToTop = () => {
  if (!isBrowser()) {
    return;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const getImageUrl = (
  product,
  hover = false
) => {
  if (!product) {
    return "";
  }

  if (hover && product.hoverImage) {
    return product.hoverImage;
  }

  return product.image || "";
};

export const getProductPrice = (product) => {
  return Number(product?.price) || 0;
};

export const getProductColors = (product) => {
  if (!Array.isArray(product?.colors)) {
    return [];
  }

  return product.colors;
};

export const getProductStorage = (product) => {
  if (!Array.isArray(product?.storageOptions)) {
    return [];
  }

  return product.storageOptions;
};

export const findProductById = (
  products = [],
  productId
) => {
  return (
    products.find(
      (product) =>
        String(product.id) === String(productId)
    ) || null
  );
};

export const filterProducts = (
  products = [],
  {
    search = "",
    category = "All",
    minPrice = 0,
    maxPrice = Infinity,
  } = {}
) => {
  const query = String(search).trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      !query ||
      product.name?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.description
        ?.toLowerCase()
        .includes(query);

    const matchesCategory =
      category === "All" ||
      product.category === category;

    const price = Number(product.price) || 0;

    const matchesPrice =
      price >= minPrice && price <= maxPrice;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice
    );
  });
};

export const sortProducts = (
  products = [],
  sort = "featured"
) => {
  const result = [...products];

  switch (sort) {
    case "price-low":
      return result.sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );

    case "price-high":
      return result.sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );

    case "rating":
      return result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );

    case "name":
      return result.sort((a, b) =>
        String(a.name).localeCompare(
          String(b.name)
        )
      );

    default:
      return result;
  }
};

export const uniqueProducts = (
  products = []
) => {
  const map = new Map();

  products.forEach((product) => {
    if (product?.id) {
      map.set(String(product.id), product);
    }
  });

  return Array.from(map.values());
};

export const formatDate = (
  date,
  options = {}
) => {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...options,
    }
  ).format(value);
};

export const formatDateTime = (date) => {
  return formatDate(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const sleep = (milliseconds) =>
  new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );