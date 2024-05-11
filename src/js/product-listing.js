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
    displayBreadcrumb(category,topFourTents.length)
    productList.renderList(topFourTents)
  } else {
    displayBreadcrumb(category,items.length)
    productList.renderList(items);
  }
  addDynamicTitle(category)
  await loadHeaderFooter();
}

function addDynamicTitle(category){
    const headerElement = document.querySelector(".product-title");
    headerElement.innerHTML = `Top Products: ${capitalizeFirstLetterInString(category)}`
}

function displayBreadcrumb(category, listLength){
    const breadcrumbElement = document.querySelector(".breadcrumb")
    breadcrumbElement.innerHTML = `${capitalizeFirstLetterInString(category)} ->(${listLength} items)`
    breadcrumbElement.style.textAlign = "right"
}

main();
