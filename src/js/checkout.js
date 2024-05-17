import { getElement, loadHeaderFooter } from "./utils.mjs";
import { CheckoutProcess } from "./CheckoutProcess.mjs";
const zipInput = getElement("#zipcode")
const checkoutProcess = new CheckoutProcess();

async function main() {
  checkoutProcess.renderCheckoutSubtotal()
  await loadHeaderFooter();
}

zipInput.addEventListener("change", () => {
  const totals = checkoutProcess.renderTotals()
  getElement(".shippingEstimate").innerHTML = `$${totals.shipping.toFixed(2)}`
  getElement(".orderTotal").innerHTML = `$${totals.total.toFixed(2)}`
  getElement(".tax").innerHTML = `$${totals.tax.toFixed(2)}`
})

main();
