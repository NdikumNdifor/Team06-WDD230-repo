import {calculateTotalPrice, getElement, getCartItems} from "./utils.mjs"
export class CheckoutProcess{
    constructor(){
        this.init()
    }

    init(){
        this.subtotal = calculateTotalPrice();
        this.itemCount = getCartItems().length;

    }

    renderCheckoutSubtotal(){
        const element = getElement(".subtotal");
        if(this.subtotal > 0) {
            element.innerHTML = `$${this.subtotal}`;
        } else{
            element.innerHTML = "$0.00"; 
        }
    
    }

    renderTotals(){
        const tax = parseFloat((this.subtotal * 0.06).toFixed(2))
        const shipping = parseFloat(10 + ((this.itemCount - 1) * 2))
        const total = parseFloat(this.subtotal + tax + shipping)

        return {
            subtotal: this.subtotal,
            tax: tax,
            shipping: shipping,
            total: total
        }
        
    }


}