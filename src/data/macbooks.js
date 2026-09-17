const macbooks = [
  {
    id: "macbook-pro-16",
    name: "MacBook Pro 16-inch",
    category: "Mac",
    slug: "macbook-pro-16",
    price: 299900,
    rating: 4.9,
    reviews: 2145,
    badge: "New",
    image:
      "https://i.pinimg.com/1200x/ec/40/d0/ec40d09d164005dbc7f7e35db17bb121.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/86/7f/f6/867ff681b4d51e76a0e5a3b9b13b9c17.jpg",
    description:
      "The ultimate MacBook Pro for demanding workflows, creative professionals, and advanced performance.",
    colors: [
      { name: "Space Black", value: "#1C1C1E" },
      { name: "Silver", value: "#D2D2D7" },
    ],
    storage: ["1TB", "2TB", "4TB", "8TB"],
    specs: {
      display: "16.2-inch Liquid Retina XDR",
      chip: "M5 Pro",
      memory: "24GB Unified Memory",
      battery: "Up to 24 hours",
      connectivity: "Wi-Fi 7",
    },
    features: [
      "M5 Pro chip",
      "Liquid Retina XDR display",
      "ProMotion technology",
      "Advanced thermal system",
      "MagSafe 3 charging",
      "Thunderbolt connectivity",
    ],
  },
  {
    id: "macbook-pro-14",
    name: "MacBook Pro 14-inch",
    category: "Mac",
    slug: "macbook-pro-14",
    price: 189900,
    rating: 4.9,
    reviews: 1876,
    badge: "Featured",
    image:
      "https://i.pinimg.com/736x/27/f5/71/27f571e84a6e98ce8d7e7da9dc014138.jpg",
    hoverImage:
      "https://i.pinimg.com/1200x/7d/99/b9/7d99b99b3a00aa158d415834b4ba9218.jpg",
    description:
      "Serious performance in a compact professional notebook with an incredible display and all-day battery life.",
    colors: [
      { name: "Space Black", value: "#1C1C1E" },
      { name: "Silver", value: "#D2D2D7" },
    ],
    storage: ["1TB", "2TB", "4TB"],
    specs: {
      display: "14.2-inch Liquid Retina XDR",
      chip: "M5",
      memory: "16GB Unified Memory",
      battery: "Up to 24 hours",
      connectivity: "Wi-Fi 7",
    },
    features: [
      "M5 chip",
      "Liquid Retina XDR display",
      "ProMotion technology",
      "MagSafe 3 charging",
      "Thunderbolt connectivity",
      "Studio-quality microphones",
    ],
  },
  {
    id: "macbook-air-15",
    name: "MacBook Air 15-inch",
    category: "Mac",
    slug: "macbook-air-15",
    price: 144900,
    rating: 4.8,
    reviews: 3264,
    badge: "Popular",
    image:
      "https://i.pinimg.com/736x/9c/44/03/9c4403992b4632c9c50e15f7f3aab6d5.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/ce/3f/39/ce3f393d06f0763383a5f9136162e00f.jpg",
    description:
      "Big-screen portability with powerful performance, a silent design, and incredible battery life.",
    colors: [
      { name: "Midnight", value: "#1C1C1E" },
      { name: "Starlight", value: "#F0E8D8" },
      { name: "Silver", value: "#D2D2D7" },
      { name: "Sky Blue", value: "#8FAFC8" },
    ],
    storage: ["512GB", "1TB", "2TB"],
    specs: {
      display: "15.3-inch Liquid Retina",
      chip: "M5",
      memory: "16GB Unified Memory",
      battery: "Up to 18 hours",
      connectivity: "Wi-Fi 7",
    },
    features: [
      "M5 chip",
      "Liquid Retina display",
      "Fanless design",
      "MagSafe 3 charging",
      "12MP Center Stage camera",
      "Six-speaker sound system",
    ],
  },
  {
    id: "macbook-air-13",
    name: "MacBook Air 13-inch",
    category: "Mac",
    slug: "macbook-air-13",
    price: 119900,
    rating: 4.8,
    reviews: 4521,
    badge: "Best Seller",
    image:
      "https://i.pinimg.com/736x/05/81/b3/0581b31a4d729106fb90005d79329b69.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/e0/d1/bb/e0d1bb6094115f2a3bbbcde447e53cf1.jpg",
    description:
      "Supercharged performance in an incredibly thin and light design made for everyday productivity.",
    colors: [
      { name: "Midnight", value: "#1C1C1E" },
      { name: "Starlight", value: "#F0E8D8" },
      { name: "Silver", value: "#D2D2D7" },
      { name: "Sky Blue", value: "#8FAFC8" },
    ],
    storage: ["512GB", "1TB", "2TB"],
    specs: {
      display: "13.6-inch Liquid Retina",
      chip: "M5",
      memory: "16GB Unified Memory",
      battery: "Up to 18 hours",
      connectivity: "Wi-Fi 7",
    },
    features: [
      "M5 chip",
      "Liquid Retina display",
      "Fanless design",
      "MagSafe 3 charging",
      "12MP Center Stage camera",
      "Touch ID",
    ],
  },
  {
    id: "mac-mini",
    name: "Mac mini",
    category: "Mac",
    slug: "mac-mini",
    price: 99900,
    rating: 4.7,
    reviews: 1738,
    badge: "New",
    image:
      "https://i.pinimg.com/1200x/48/23/ed/4823edf15865f5aeba2923f81b6fb407.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/8b/a1/ce/8ba1cef3bc27adcb66ed00681689d1a8.jpg",
    description:
      "Compact desktop power with exceptional performance packed into a remarkably small footprint.",
    colors: [
      { name: "Silver", value: "#D2D2D7" },
    ],
    storage: ["256GB", "512GB", "1TB", "2TB"],
    specs: {
      display: "External Display Support",
      chip: "M6",
      memory: "16GB Unified Memory",
      battery: "Desktop Power",
      connectivity: "Wi-Fi 7",
    },
    features: [
      "M6 chip",
      "Compact design",
      "Multiple display support",
      "Thunderbolt connectivity",
      "USB-C connectivity",
      "Gigabit Ethernet",
    ],
  },
];

export { macbooks };

export default macbooks;