import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetail from "./productDetail.mjs";

const dataSource = new ProductData("tents");

const prodId = getParam('product');

const product = new ProductDetail(prodId, dataSource);

// add to cart button event handler
async function addToCartHandler(product) {
  product.addProductToCart(product);
}

