import { getLocalStorage, setLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const productId = getParams('product');
const dataSource = new ProductData("tents");

console.log(productId); // Just checking(can be deleted) if the id of a particular product is printed out.
console.log(dataSource.findProductById(productId));// Just testing(can be deleted) out our findProductById method to see if we have a promiss to that product as well.

const product = new ProductDetails(productId, dataSource);
product.init();



// function addProductToCart(product) {
//   let customerCart = getLocalStorage("so-cart");
//   if (customerCart == null) {
//     customerCart = [];
//     customerCart.push(product);
//   } else {
//     customerCart.push(product);
//   }
//   setLocalStorage("so-cart", customerCart);
// }
// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
