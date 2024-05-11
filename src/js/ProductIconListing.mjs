
import { renderListWithTemplate } from "./utils.mjs"

const productCardTemplate = (icon) => 
  `
          <li class="product-card">
            <a href="product-listing/index.html?category=${icon.category}">
              <img
                src="${icon.src}"
                alt="${icon.alt}"
              />
              <p> ${icon.name} </p>
              </a>
          </li>
  `;

export default class ProductIconListing {
  constructor(datasource, listElement) {
    this.datasource = datasource;
    this.listElement = listElement;
  }

  async init() {
    this.data = await this.datasource.getData(this.category);
  }

  get products() {
    return this.data;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list); 
  }
}

