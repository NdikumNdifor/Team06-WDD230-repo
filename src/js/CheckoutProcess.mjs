import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.list = this.cleanList();
        this.calculateItemSummary();
      }

      cleanList(){
        let newList = this.list.map(item =>{
            return{
                "id": item.Id,
                "name": item.Name,
                "price": parseFloat(item.FinalPrice),
                "quantity": parseInt(item.Quantity)
            }
        });
        return newList;
      }

      displayItemSummary(){
        document.querySelector("#output").innerHTML = 
        `<p>Subtotal: <span id="subtotal">${this.itemTotal.toFixed(2)}</span></p>`;
      }
    
      calculateItemSummary() {
        this.itemTotal = this.list.reduce( (accumulator, item)=>item.quantity*item.price + accumulator, 0);
        this.displayItemSummary();
      }
    
      calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.shipping = this.list.reduce( (accumulator, item) =>accumulator + (item.quantity == 1 ? 10 : 10 + (item.quantity-1) * 2), 0);
        this.tax = this.list.reduce( (accumulator, item)=>item.quantity * item.price + accumulator, 0) * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
    
        // display the totals.
        this.displayOrderTotals();
      }
    
      displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        document.querySelector("#output").innerHTML += 
        `<p>Shipping Est.: ${this.shipping.toFixed(2)}</p>
        <p>Tax (6%): ${this.tax.toFixed(2)}</p>
        <p><strong>Total: ${this.orderTotal.toFixed(2)}</strong></p>`;
      }
    }