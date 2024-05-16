import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const output = document.querySelector("#output");

const zipInput = document.querySelector("form").zip;

const checkoutProcess = new CheckoutProcess("so-cart",output);

checkoutProcess.init();

zipInput.addEventListener("blur", (e)=>{
  if(e.target.value.length == 5){
    checkoutProcess.calculateOrdertotal();
  }
})

async function main() {
  await loadHeaderFooter();
}

main();

