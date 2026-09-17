import iphones from "./iphones";
import ipads from "./ipads";
import macbooks from "./macbooks";
import watches from "./watches";
import airpods from "./airpods";

const allProducts = [
  ...iphones,
  ...ipads,
  ...macbooks,
  ...watches,
  ...airpods,
];

const featured = allProducts
  .filter((product) => product.badge)
  .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
  .slice(0, 10);

export { allProducts };

export default featured;