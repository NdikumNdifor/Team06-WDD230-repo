import {calculateTotalPrice, getElement, getCartItems, setLocalStorage, alertMessage} from "./utils.mjs"
import ExternalServices from "./ExternalServices.mjs"
// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    return items.map((item)=>{
    const returnItem = {
        id: item.Id,
        name: item.Name,
        price: parseFloat(item.FinalPrice.toFixed(2)),
        quantity: item.Quantity 
    }
    return returnItem
    })
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
  }
export class CheckoutProcess{
    constructor(){
        this.init()
    }

    init(){
        this.subtotal = calculateTotalPrice();
        this.itemCount = getCartItems().length;
        this.externalServices = new ExternalServices();

    }

    async checkout(form) {
        const tax = parseFloat((this.subtotal * 0.06).toFixed(2))
        const shipping = parseFloat(10 + ((this.itemCount - 1) * 2))
        const total = (this.subtotal + tax + shipping).toFixed(2)
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const formJSON = formDataToJSON(form)
        const orderObject = {
            orderDate: new Date(),
            fname: formJSON.fname,
            lname: formJSON.lname,
            street: formJSON.street,
            city: formJSON.city,
            state: formJSON.state,
            zip: formJSON.zip,
            cardNumber: formJSON.cardNumber,
            expiration: formJSON.expiration,
            code: formJSON.code,
            items: packageItems(getCartItems()),
            orderTotal: total,
            shipping: shipping,
            tax: tax.toFixed(2)
        }
        try{
            // call the checkout method in our ExternalServices module and send it our data object.
            const response = await this.externalServices.checkout(orderObject);
            if(response.ok){
                setLocalStorage("so-cart", []);
                window.location.href="/index.html";
                alert("Your purchase was sucessful!");
            }
            else{
                let messages = await response.json();
                for(let key in messages){
                    alertMessage(messages[key]);
                }
            }
        }catch (error){
            console.log(error);
        }
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
