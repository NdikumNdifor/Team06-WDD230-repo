import { getLocalStorage } from "./utils.mjs";

function packageItems(items){
    let newList = items.map(item =>{
        return{
            "id": item.Id,
            "name": item.Name,
            "price": parseFloat(item.FinalPrice),
            "quantity": parseInt(item.Quantity)
        }
    });
    return newList;
  }

  function formDataToJSON(formElement){
    const formData = new FormData(formElement);
    let convertedJSON = {};
    formData.forEach((value, key) =>{
        convertedJSON[key] = value;
    });

    return convertedJSON;
  }

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
        this.list = packageItems(this.list);
        this.calculateItemSummary();
      }

      displayItemSummary(){
        document.querySelector("#output").innerHTML = 
        `<p>Subtotal: <span id="subtotal">$${this.itemTotal.toFixed(2)}</span></p>`;
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
        `<p>Shipping Est.: $${this.shipping.toFixed(2)}</p>
        <p>Tax (6%): $${this.tax.toFixed(2)}</p>
        <p><strong>Total: $${this.orderTotal.toFixed(2)}</strong></p>`;
      }

      checkoutHandler (formElement){
        const formJSON = formDataToJSON(formElement);
        let data ={
            ...formJSON,
            "orderDate":  new Date(),
            "items":this.list,
            "orderTotal": this.orderTotal,
            "shipping": this.shipping,
            "tax": this.tax
        }
        console.log(JSON.stringify(data));
        this.checkout(data);
      }

      async checkout(order){
        const url = "https://wdd330-backend.onrender.com:3000/checkout/";
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        };
        
        try{
            let response = await fetch(url, options);
            return response;
        } catch(error){
            console.log(error);
        }
      }
    }