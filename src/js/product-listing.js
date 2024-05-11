import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs"
import { capitalizeFirstLetterInString, getParams, loadHeaderFooter } from "./utils.mjs"

const main = async () => {
  const category = getParams("category");
  const dataSource = new ProductData(category);
  const listElement = document.querySelector(".product-list")
  const productList = new ProductListing(category, dataSource, listElement);
  await productList.init();
  const items = productList.data;
  if (category == "tents"){
    const topFourTentIds = ["880RR", "985RF", "985PR", "344YJ"];
    const topFourTents = items.filter((product) => topFourTentIds.includes(product.Id))
    productList.renderList(topFourTents)
  } else {
    productList.renderList(items);
  }
  addDynamicTitle(category)
  await loadHeaderFooter();
}

function addDynamicTitle(category){
    const listElement = document.querySelector(".product-title");
    listElement.innerHTML = `Top Products: ${capitalizeFirstLetterInString(category)}`
}

main();
