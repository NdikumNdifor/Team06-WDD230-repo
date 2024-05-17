import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  getCartItems,
  calculateTotalPrice
} from "./utils.mjs";
import { ShoppingCart } from "./ShoppingCart.mjs";

// Returns shopping cart items.


//get cart from local storage and verify if exists[has any item]
// function renderCartContents() {
//   const cartItems = getCartItems();
//   cartItems === null || cartItems.length === 0
//     ? emptyCart()
//     : displayCart(cartItems);

// }

//display an empty cart's message
// function emptyCart() {
//   document.querySelector(".product-list").innerHTML = `
//     <li>
//       <h3>Sorry, you have no items in the cart!</h3>
//     </li>`;
// }

//map cart items into an appropriate displaying template
// function displayCart(cartItems) {
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// Dynamically generates HTML for cart item.
// function cartItemTemplate(item) {
//   const newItem = `
//   <li class="cart-card divider">
//     <a href="#" class="cart-card__image">
//       <img
//         src="${item.Image}"
//         alt="${item.Name}"
//       />
//     </a>
//     <a href="#">
//       <h2 class="card__name">${item.Name}</h2>
//     </a>
//     <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//     <p class="cart-card__quantity"><span>qty: 1</span><button id="${item.Id}" class="delete-button">X</button></p>
//     <p class="cart-card__price">$${item.FinalPrice}</p>
//   </li>`;

//   return newItem;
// }

// Removes item from list and saves the list back to local storage.
function removeItem(item) {
  const cartItems = getCartItems();
  const newItemsArray = cartItems.filter((cItem) => cItem.Id !== item);
  setLocalStorage("so-cart", newItemsArray);
}

function renderTotalPrice(){
  const totalPrice = calculateTotalPrice()
  if (totalPrice > 0){
    document.getElementById("cart-total").textContent = `$${calculateTotalPrice()}`;
  } else {
    document.getElementById("cart-total").textContent = "$0.00";
  }
}

// Handles remove item click event and verifies the that the delete button was clicked.
function removeItemClickHandlder(event) {
  const element = event.target;
  if (element.classList.contains("delete-button")) {
    removeItem(element.id);
    shoppingCart.getItems();
    shoppingCart.renderItems();
    renderTotalPrice()
  }
}

//handle new selected item quantity
function updateItemQuantityHandler(event) {
  let prodId = event.target.id;
  let newQuantity = parseInt(event.target.value);
  updateQuantity(prodId, newQuantity);
}

function updateQuantity(id, newQuantity) {
  let cartItems = getCartItems();
  let newItemsArray = cartItems.map((item) => {
    if (item.Id == id) {
      item.Quantity = newQuantity;
    }
    return item;
  });
  setLocalStorage("so-cart", newItemsArray);
  shoppingCart.getItems();
  shoppingCart.renderItems();
  renderTotalPrice()
}

async function main() {
  await loadHeaderFooter();
  shoppingCart.renderItems();
  renderTotalPrice();
  // Adds event listener to product list element.
  document
    .querySelector(".product-list")
    .addEventListener("click", removeItemClickHandlder);
  document
    .querySelector(".product-list")
    .addEventListener("change", updateItemQuantityHandler);
}



const productListElement = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart("so-cart", productListElement);
main();
