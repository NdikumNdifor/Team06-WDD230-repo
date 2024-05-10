
import { renderListWithTemplate, displayDiscount } from "./utils.mjs"

const productCardTemplate = (product) => 
  `
          <li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              ${displayDiscount(product)}
              </a>
          </li>
  `;

export default class ProductListing {
  constructor(category, datasource, listElement) {
    this.category = category;
    this.datasource = datasource;
    this.listElement = listElement;
  }

  async init() {
    this.data = await this.datasource.getData(this.category);
  }

  getProducts() {
    return this.data;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list); 
  }
}

