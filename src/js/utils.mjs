import { displayCartItemsNotification } from "./cartSuperScript"
import { initializeSearchBar } from "./SearchBar";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

export function alertMessage(message, scroll=true){
  const mainElement = document.querySelector("main");

  const messageError = document.createElement("div");
  const close = document.createElement("span");
  close.innerText = "X";
  close.style.cursor = "pointer";

  messageError.innerText = message;
  messageError.style.backgroundColor = "#f0a868";
  messageError.style.border = "1px solid #ff871f";
  messageError.style.marginTop = ".5rem";
  messageError.style.padding = ".5rem";

  messageError.append(close);

  close.addEventListener("click", e=>messageError.remove());
  close.style.float = "right";

  mainElement.prepend(messageError);

}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}


export function displayDiscount(product){
  if (product.SuggestedRetailPrice > product.FinalPrice){
    const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)
    return `<p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product-card__price">(Discounted $${discountAmount}!)</p>`
  }else{
    return `<p class="product-card__price">$${product.FinalPrice}</p>`
  }
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear === true) parentElement.innerHTML = "";
  list.map((item) => {
    const itemHtml = templateFn(item);
    parentElement.insertAdjacentHTML(position, itemHtml);
  })
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  position = "afterbegin",
  clear = false,
) {
  if (clear === true) parentElement.innerHTML = "";
  const itemHtml = await templateFn(data);
  parentElement.insertAdjacentHTML(position, itemHtml.innerHTML);
}

export async function loadHeaderFooter() {
  const header = getElement("#main-header");
  const headerPath = "/partials/header.html";
  const footer = getElement("#main-footer");
  const footerPath = "/partials/footer.html";
  const promises = [];
  promises.push(renderWithTemplate(loadTemplate, header, headerPath));
  promises.push(renderWithTemplate(loadTemplate, footer, footerPath));
  await Promise.all(promises);
  displayCartItemsNotification();
  initializeSearchBar();
}

export async function loadTemplate(path) {
  const req = await fetch(path);
  const html = await req.text();
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export function capitalizeFirstLetterInString(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getElement(query) {
  return document.querySelector(query);
}

export function getCartItems() {
  return getLocalStorage("so-cart");
}

//Add up the total and pass it to the html cart-total
export function calculateTotalPrice() {
  const cartItems = getCartItems();
  if (cartItems != null || cartItems != undefined) {
    const totalPrice = parseFloat(cartItems.reduce(
      (acc, item) => acc + item.FinalPrice * item.Quantity,
      0,
    ).toFixed(2));
    return totalPrice
  } else {
    return 0
  }
}

