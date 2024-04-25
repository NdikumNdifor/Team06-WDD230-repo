import { getLocalStorage } from "./utils.mjs";

//get cart from local storage and verify if exists[has any item]
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  cartItems === null ? emptyCart()  : displayCart(cartItems);
}

//display an empty cart's message
function emptyCart(){
  document.querySelector(".product-list").innerHTML = `
    <li>
      <h3>Sorry, you have no items in the cart!</h3>
    </li>`;
}

//map cart items into an appropriate displaying template
function displayCart(cartItems){
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
