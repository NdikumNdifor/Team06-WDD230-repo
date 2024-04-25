import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let customerCart = getLocalStorage("so-cart");
  if (customerCart == null) {
    customerCart = [];
    customerCart.push(product);
  } else {
    customerCart.push(product);
  }
  setLocalStorage("so-cart", customerCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
