import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import {
  capitalizeFirstLetterInString,
  getElement,
  getParams,
  loadHeaderFooter,
} from "./utils.mjs";

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const main = async () => {
  await loadHeaderFooter();
  const category = getParams("category");
  const search = getParams("search");
  if (category) await handleCategoryInput(category);
  if (search) await handleSearchInput(search);
};

async function handleCategoryInput(category) {
  const products = await dataSource.getData(category);
  const productList = new ProductListing(products, listElement);
  // await productList.init();
  const items = productList.products;
  displayBreadcrumb(category, items.length);
  productList.renderList(items);
  const title = `Top Products: ${capitalizeFirstLetterInString(category)}`;
  addDynamicTitle(title);
  // if (category == "tents"){
  //   const topFourTentIds = ["880RR", "985RF", "985PR", "344YJ"];
  //   const topFourTents = items.filter((product) => topFourTentIds.includes(product.Id))
  //   displayBreadcrumb(category,topFourTents.length)
  //   productList.renderList(topFourTents)
  // } else {
  //   displayBreadcrumb(category,items.length)
  //   productList.renderList(items);
  // }
}

async function handleSearchInput(searchInput) {
  const searchInputElement = getElement("#search-bar-input");
  searchInputElement.value = searchInput;
  const items = await dataSource.searchData(searchInput);
  const productList = new ProductListing(items, listElement);
  const products = productList.products;
  displayBreadcrumb("Found", products.length);
  productList.renderList(products);
  const title = `Search: ${searchInput}`;
  addDynamicTitle(title);
  // console.log(items);
}

function addDynamicTitle(title) {
  const headerElement = document.querySelector(".product-title");
  headerElement.textContent = title;
}

function displayBreadcrumb(category, listLength) {
  const breadcrumbElement = document.querySelector(".breadcrumb");
  breadcrumbElement.innerHTML = `${capitalizeFirstLetterInString(category)} ->(${listLength} items)`;
  breadcrumbElement.style.textAlign = "right";
}

main();
