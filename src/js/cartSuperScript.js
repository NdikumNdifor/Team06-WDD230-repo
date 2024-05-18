import { getLocalStorage } from "./utils.mjs";

//display cart notification with itens quantity
export function displayCartItemsNotification() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null || cartItems != undefined) {
    const cartDiv = document.querySelector(".cart");
    const badge = document.createElement("span");
    badge.style.backgroundColor = "var(--primary-color)";
    badge.style.color = "#000";
    badge.style.position = "absolute";
    badge.style.top = "10px";
    badge.style.right = "-5px";
    badge.style.zIndex = 2;
    badge.style.height = "20px";
    badge.style.width = "20px";
    badge.style.borderRadius = "50%";
    badge.style.fontSize = ".9rem";
    badge.style.alignContent = "center";
    badge.style.justifyContent = "center";

    badge.innerText = cartItems.length;

    cartDiv.appendChild(badge);
  }
}
