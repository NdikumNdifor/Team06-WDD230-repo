import { getLocalStorage, setLocalStorage, displayDiscount, alertMessage, displayColors, displayPreviewColors } from "./utils.mjs";

export default class ProductDetail {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
  }
  
  addProductToCart(product) {
  let customerCart = getLocalStorage("so-cart");
  let ColorCode = document.querySelector("#color").value;
  
  //spreading product into product for adding quantity key-value pair
  product = {...product, Quantity: 1, ColorCode: ColorCode};
  
  //pushing product into cart
  if (customerCart == null) {
    customerCart = [];
    customerCart.push(product);
  } 
  else {
    let update = false;
    customerCart.map(item => {
      if(item.Id == product.Id){
        item.Quantity += 1;
        update = true;
      }
    });
    if(!update){
      customerCart.push(product);
    }
  }
  setLocalStorage("so-cart", customerCart);
  this.animateBackpack()
  alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }

  renderProductDetails() {
    return `<h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.NameWithoutBrand}"
        />

        ${displayDiscount(this.product)}

        <div class="product__color-container"> 

          <label class="product__color">Color:</label>
          <select id="color" name="color">
          ${displayColors(this.product)}
          </select>

          ${displayPreviewColors(this.product)}
          
        </div>


        <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      `;

    
  }

  updatePreviewImage(event, previewColorImages){
    let code = event.target.value;
    previewColorImages.forEach(image=>{
      if(!image.classList.contains("hidden")){
        image.classList.add("hidden");
        image.classList.remove("show");
      }
      if(image.id.substring(5,7) == code){
        image.classList.remove("hidden");
        image.classList.add("show");
      }
    }); 
  }

  animateBackpack() {
    const backpackElement = document.querySelector(".cart svg");
    backpackElement.classList.remove("animateBackpack");
    void backpackElement.offsetWidth;
    setTimeout(() => {
        backpackElement.classList.add("animateBackpack");
    }, 100);
  }
}

