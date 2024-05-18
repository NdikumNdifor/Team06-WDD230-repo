import { getElement, loadHeaderFooter } from "./utils.mjs";
import { CheckoutProcess } from "./CheckoutProcess.mjs";
const zipInput = getElement("#zipcode");
const checkoutProcess = new CheckoutProcess();
const formButton = getElement(".purchaseButton");
const formElement = getElement(".checkoutForm")

async function main() {
  const pathName = window.location.pathname;
  const splitPath = pathName.split("/")
  const pageName = splitPath[splitPath.length - 1];
  await loadHeaderFooter();
  if (pageName === "index.html") {
    checkoutProcess.renderCheckoutSubtotal();
    renderExpirationPlaceholder();
    runCheckoutPageLogic();
  }
}


function runCheckoutPageLogic() {
  zipInput.addEventListener("change", () => {
    const totals = checkoutProcess.renderTotals();
    getElement(".shippingEstimate").innerHTML = `$${totals.shipping.toFixed(2)}`;
    getElement(".orderTotal").innerHTML = `$${totals.total.toFixed(2)}`;
    getElement(".tax").innerHTML = `$${totals.tax.toFixed(2)}`;
  });

  formButton.addEventListener("click", (event) =>{
    event.preventDefault();
    const form = document.forms.checkoutForm;
    if (form.checkValidity())
      checkoutProcess.checkout(formElement);
    else form.reportValidity();
  });
}


function calculateExpirationPlaceholder() {
  const now = new Date();
  now.setFullYear(now.getFullYear() + 1);
  const monthNumber = now.getMonth() + 1;
  const monthString = monthNumber.toString().length < 2 ? `0${monthNumber}` : monthNumber.toString();
  const yearString = now.getFullYear().toString().slice(2);
  return `${monthString}/${yearString}`;
}

function renderExpirationPlaceholder() {
  const expirationElement = getElement("#expiration");
  expirationElement.setAttribute("placeholder", calculateExpirationPlaceholder());
}

main();
