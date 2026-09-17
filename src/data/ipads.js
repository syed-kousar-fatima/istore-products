const ipads = [
  {
    id: "ipad-pro-13",
    name: "iPad Pro 13-inch",
    category: "iPad",
    slug: "ipad-pro-13",
    price: 159900,
    rating: 4.9,
    reviews: 1836,
    badge: "New",
    image:
      "https://i.pinimg.com/736x/db/52/ef/db52ef618057da1a5fb12c5d001e5f98.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/c6/31/0a/c6310a8e571bff75e2e12e84ec811bf3.jpg",
    description:
      "The ultimate iPad experience with incredible performance, a stunning display, and a remarkably thin design.",
    colors: [
      { name: "Space Black", value: "#1C1C1E" },
      { name: "Silver", value: "#E5E5E7" },
    ],
    storage: ["256GB", "512GB", "1TB", "2TB"],
    specs: {
      display: "13-inch Ultra Retina XDR",
      chip: "M5",
      camera: "12MP Wide Camera",
      battery: "Up to 10 hours",
      connectivity: "Wi-Fi",
    },
    features: [
      "M5 chip",
      "Ultra Retina XDR display",
      "ProMotion technology",
      "12MP camera system",
      "USB-C with Thunderbolt",
      "Apple Pencil Pro support",
    ],
  },
  {
    id: "ipad-pro-11",
    name: "iPad Pro 11-inch",
    category: "iPad",
    slug: "ipad-pro-11",
    price: 139900,
    rating: 4.9,
    reviews: 1542,
    badge: "Featured",
    image:
      "https://i.pinimg.com/736x/82/52/6b/82526b0cdb5cbd708f0c9038fd4b0cf1.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/12/a9/c8/12a9c8d6d8df594335943f7ad9b27872.jpg",
    description:
      "Powerful performance in a compact design, built for creativity, productivity, and entertainment.",
    colors: [
      { name: "Space Black", value: "#1C1C1E" },
      { name: "Silver", value: "#E5E5E7" },
    ],
    storage: ["256GB", "512GB", "1TB", "2TB"],
    specs: {
      display: "11-inch Ultra Retina XDR",
      chip: "M5",
      camera: "12MP Wide Camera",
      battery: "Up to 10 hours",
      connectivity: "Wi-Fi",
    },
    features: [
      "M5 chip",
      "Ultra Retina XDR display",
      "ProMotion technology",
      "12MP camera system",
      "USB-C with Thunderbolt",
      "Apple Pencil Pro support",
    ],
  },
  {
    id: "ipad-air-13",
    name: "iPad Air 13-inch",
    category: "iPad",
    slug: "ipad-air-13",
    price: 84900,
    rating: 4.8,
    reviews: 2187,
    badge: "Popular",
    image:
      "https://i.pinimg.com/1200x/9b/fa/16/9bfa16e4c8b70a5c2972fe5f374d7575.jpg",
    hoverImage:
      "https://i.pinimg.com/1200x/2a/54/54/2a54542d61ab89a76586e86108902e5a.jpg",
    description:
      "Powerful, colorful, and versatile with the performance to handle work, creativity, and play.",
    colors: [
      { name: "Blue", value: "#5E8FC5" },
      { name: "Purple", value: "#9B8CC2" },
      { name: "Starlight", value: "#F0E8D8" },
      { name: "Space Gray", value: "#686868" },
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    specs: {
      display: "13-inch Liquid Retina",
      chip: "M4",
      camera: "12MP Wide Camera",
      battery: "Up to 10 hours",
      connectivity: "Wi-Fi",
    },
    features: [
      "M4 chip",
      "Liquid Retina display",
      "12MP landscape camera",
      "USB-C connectivity",
      "Apple Pencil Pro support",
      "Magic Keyboard support",
    ],
  },
  {
    id: "ipad-air-11",
    name: "iPad Air 11-inch",
    category: "iPad",
    slug: "ipad-air-11",
    price: 64900,
    rating: 4.8,
    reviews: 2974,
    badge: "Best Seller",
    image:
      "https://i.pinimg.com/736x/70/89/00/708900039e350057dda7847e4036fde5.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/6e/0e/34/6e0e34f350cd44e5262a96b3bd7ca3cc.jpg",
    description:
      "The perfect balance of portability and performance with an immersive Liquid Retina display.",
    colors: [
      { name: "Blue", value: "#5E8FC5" },
      { name: "Purple", value: "#9B8CC2" },
      { name: "Starlight", value: "#F0E8D8" },
      { name: "Space Gray", value: "#686868" },
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    specs: {
      display: "11-inch Liquid Retina",
      chip: "M4",
      camera: "12MP Wide Camera",
      battery: "Up to 10 hours",
      connectivity: "Wi-Fi",
    },
    features: [
      "M4 chip",
      "Liquid Retina display",
      "12MP landscape camera",
      "USB-C connectivity",
      "Apple Pencil Pro support",
      "Magic Keyboard support",
    ],
  },
  {
    id: "ipad-11",
    name: "iPad 11-inch",
    category: "iPad",
    slug: "ipad-11",
    price: 49900,
    rating: 4.7,
    reviews: 4218,
    badge: "Popular",
    image:
      "https://i.pinimg.com/1200x/2f/8c/e4/2f8ce472989acfe1273c8dadb15743ab.jpg",
    hoverImage:
      "https://i.pinimg.com/1200x/6e/58/b5/6e58b5c3a849a0ddf8762651de906869.jpg",
    description:
      "A powerful and versatile iPad designed for everyday productivity, entertainment, and creativity.",
    colors: [
      { name: "Silver", value: "#E5E5E7" },
      { name: "Blue", value: "#5E8FC5" },
      { name: "Yellow", value: "#E8D36D" },
      { name: "Pink", value: "#E8A6B7" },
    ],
    storage: ["128GB", "256GB", "512GB"],
    specs: {
      display: "11-inch Liquid Retina",
      chip: "A16",
      camera: "12MP Wide Camera",
      battery: "Up to 10 hours",
      connectivity: "Wi-Fi",
    },
    features: [
      "A16 chip",
      "Liquid Retina display",
      "12MP camera",
      "USB-C connectivity",
      "Apple Pencil support",
      "Touch ID",
    ],
  },
];

export { ipads };

export default ipads;