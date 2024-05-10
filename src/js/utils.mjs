// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

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

//  DYNAMIC HEADER AND FOOTER 

// function to take an optional object and a template and insert the objects as HTML into the DOM
export function renderWithTemplate(templateFn, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", templateFn);
    //if there is a callback...call it and pass data
    if(callback){
      callback(data);
    }
  // if (clear === true) parentElement.innerHTML = "";
  // list.map((item) => {
  //   const itemHtml = templateFn(item);
  //   parentElement.insertAdjacentHTML(position, itemHtml);
  // })
}

export async function loadHeaderFooter(path){
    const html = await fetch(path.text).then(convertToText);
    const template = document.createElement("template");
    template.innerHTML = html;
    return template

  // const res = await fetch(path);
  // const template = await res.text();
  // return template;
}

