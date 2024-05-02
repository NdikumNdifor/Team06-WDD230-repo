import ProductListing from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

const tents = new ProductData("tents");
const productContainer = document.querySelector(".product-list");

const productListing = new ProductListing("tents", tents, productContainer);