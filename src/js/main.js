import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

let testListDiv = document.querySelector(".products")
const dataSource = new ProductData("tents");
const tentListing = new ProductListing("tents", dataSource, testListDiv);
tentListing.init();

