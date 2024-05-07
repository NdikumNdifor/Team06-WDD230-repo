import ProductData from "./ProductData.mjs";
import ProductListing from "./productList.mjs";

const dataSource = new ProductData("tents");

const ul = document.querySelector(".product-list");

const product = new ProductListing("tents", dataSource, ul);
product.init();
