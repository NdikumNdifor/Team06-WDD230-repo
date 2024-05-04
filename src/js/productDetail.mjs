import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const productData = new ProductData();
const tentContainer = document.querySelector(".product-detail");

export default class ProductDetail{
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        this.htmlTemplate = "";
    }

    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        this.generateHtmlTemplate(this.product);
        document.getElementById("addToCart").addEventListener("click", this.addProductToCart(this.product));
    }

    addProductToCart() {
        let customerCart = getLocalStorage("so-cart");
        if (customerCart == null) {
          customerCart = [];
          customerCart.push(this.product);
        } else {
          customerCart.push(this.product);
        }
        setLocalStorage("so-cart", customerCart);
    }

    displayProductDetails(){
        document.querySelector(".product-detail").innerHTML = this.htmlTemplate;
    }

    generateHtmlTemplate(product){
        tentContainer.innerHTML = `<h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.Name}"
        />

        <p class="product-card__price">$${this.product.FinalPrice}</p>

        <p class="product__color">${this.product.Colors[0].ColorName}</p>

        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>`;
    }
}