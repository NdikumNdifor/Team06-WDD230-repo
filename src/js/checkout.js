import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const output = document.querySelector("#output");

const formElement = document.querySelector("form");

const zipInput = formElement.zip;

const checkoutProcess = new CheckoutProcess("so-cart",output);


checkoutProcess.init();

formElement.addEventListener("submit", (e)=>{
  e.preventDefault();
  checkoutProcess.checkoutHandler(formElement);
})

zipInput.addEventListener("blur", (e)=>{
  if(e.target.value.length == 5){
    checkoutProcess.calculateOrdertotal();
  }
});

async function main() {
  await loadHeaderFooter();
}

main();

