import ProductData from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { QuicklookModal } from "./QuickLookModal.mjs";
import {
  capitalizeFirstLetterInString,
  getElement,
  getParams,
  loadHeaderFooter,
} from "./utils.mjs";

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const lookupModal = new QuicklookModal();

const main = async () => {
  await loadHeaderFooter();
  const category = getParams("category");
  const search = getParams("search");
  let products;
  let title;
  if (category) {
    products = await getCategoryProducts(category);
    title = `Top Products: ${capitalizeFirstLetterInString(category)}`;
    displayBreadcrumb(category, products.length);
  }
  if (search) {
    products = await getSearchProducts(search);
    title = `Search: ${search}`;
    displayBreadcrumb("Found", products.length);
  }
  const productList = new ProductListing(products, listElement);
  productList.renderList();
  addDynamicTitle(title);
  registerLookupButtons();
};

function registerLookupButtons() {
  const buttons = document.querySelectorAll(".lookup-button")
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      lookupModal.open(button.getAttribute("id"));
    })
  })
}

async function getCategoryProducts(category) {
    return dataSource.getData(category);
  // const productList = new ProductListing(products, listElement);
  // const items = productList.products;
  // displayBreadcrumb(category, items.length);
  // productList.renderList(items);
  // const title = `Top Products: ${capitalizeFirstLetterInString(category)}`;
  // addDynamicTitle(title);
}

async function getSearchProducts(searchInput) {
  const searchInputElement = getElement("#search-bar-input");
  searchInputElement.value = searchInput;
  return dataSource.searchData(searchInput);
  // const searchInputElement = getElement("#search-bar-input");
  // searchInputElement.value = searchInput;
  // const items = await dataSource.searchData(searchInput);
  // const productList = new ProductListing(items, listElement);
  // const products = productList.products;
  // displayBreadcrumb("Found", products.length);
  // productList.renderList(products);
  // const title = `Search: ${searchInput}`;
  // addDynamicTitle(title);
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
