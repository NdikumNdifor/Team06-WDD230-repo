import { getLocalStorage } from "./utils.mjs";

const cartItemTemplate = (item) => `
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
  </li>
`

const emptyCartTemplate = () => ` 
    <li>
      <h3>Sorry, you have no items in the cart!</h3>
    </li>`;

export class ShoppingCart {
  constructor(key, parentElement) {
    this.key = key;
    this.parentElement = parentElement;
    this.init();
  }

  init() {
    this.getItems();
  }
  
  getItems() {
    this.items = getLocalStorage(this.key);
  }

  emptyCart() {
    const emptyCartHtml = emptyCartTemplate();
    this.parentElement.innerHTML = emptyCartHtml;
  }

  renderItems() {
    this.parentElement.innerHTML = "";
    if(this.items === null || this.items.length === 0) {
      this.emptyCart();
      return;
    } 
    this.items.map((item) => this.parentElement.innerHTML += cartItemTemplate(item));
  }
}
