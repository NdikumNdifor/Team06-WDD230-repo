import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Returns shopping cart items.
function getCartItems() {
  return getLocalStorage("so-cart");
}

//get cart from local storage and verify if exists[has any item]
function renderCartContents() {
  const cartItems = getCartItems();
  cartItems === null || cartItems.length === 0
    ? emptyCart()
    : displayCart(cartItems);
  calculateTotalPrice();
}

//display an empty cart's message
function emptyCart() {
  document.querySelector(".product-list").innerHTML = `
    <li>
      <h3>Sorry, you have no items in the cart!</h3>
    </li>`;
}

//map cart items into an appropriate displaying template
function displayCart(cartItems) {
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Dynamically generates HTML for cart item.
function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity"><span>qty: 1</span><button id="${item.Id}" class="delete-button">X</button></p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// Removes item from list and saves the list back to local storage.
function removeItem(item) {
  const cartItems = getCartItems();
  const newItemsArray = cartItems.filter((cItem) => cItem.Id !== item);
  setLocalStorage("so-cart", newItemsArray);
}

// Handles remove item click event and verifies the that the delete button was clicked.
function removeItemClickHandlder(event) {
  const element = event.target;
  if (element.classList.contains("delete-button")) {
    removeItem(element.id);
    renderCartContents();
  }
}

//Add up the total and pass it to the html cart-total
function calculateTotalPrice() {
  const cartItems = getCartItems();
  if (cartItems != null || cartItems != undefined){
    const totalPrice = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    document.getElementById("cart-total").textContent = `$${totalPrice}`;
  }
  else{
    document.getElementById("cart-total").textContent = `$0.00`;
  }
}

renderCartContents();

// Adds event listener to product list element.
document
  .querySelector(".product-list")
  .addEventListener("click", removeItemClickHandlder);
