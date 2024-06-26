
import { renderListWithTemplate, displayDiscount } from "./utils.mjs"

const productCardTemplate = (product) => 
  `
          <li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              ${displayDiscount(product)}
              </a>
              <button class="lookup-button" id="${product.Id}"><img src="/images/icons/info.svg" alt="Google Material Info Icon"></button>
          </li>
  `;

export default class ProductListing {
  constructor(products, listElement) {
    this.data = products;
    this.listElement = listElement;
  }

  // async init() {
  //   this.data = await this.datasource.getData(this.category);
  // }

  get products() {
    return this.data;
  }

  renderList() {
    renderListWithTemplate(productCardTemplate, this.listElement, this.data); 
  }
}

