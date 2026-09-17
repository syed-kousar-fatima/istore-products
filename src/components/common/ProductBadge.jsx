const ProductBadge = ({
  text,
  variant = "new",
}) => {
  const variants = {
    new: "bg-blue-500/15 text-blue-400",
    sale: "bg-red-500/15 text-red-400",
    hot: "bg-orange-500/15 text-orange-400",
    featured: "bg-green-500/15 text-green-400",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${variants[variant]}`}
    >
      {text}
    </span>
  );
};

export default ProductBadge;