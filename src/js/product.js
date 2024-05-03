import { getParams } from "./utils.mjs";
import ProductDetail from "./ProductDetail.mjs";
import ProductData from "./ProductData.mjs";

const productId = getParams("product");
const dataSource = new ProductData("tents");
const productDetail = new ProductDetail(productId, dataSource);

async function main() {
  await productDetail.init();

  const docDetailsElement = document.querySelector(".product-detail");
  docDetailsElement.innerHTML = productDetail.renderProductDetails();

  // add listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

main();

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  productDetail.addProductToCart(product);
}
