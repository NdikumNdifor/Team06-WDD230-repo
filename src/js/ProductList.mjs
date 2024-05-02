function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=">
        <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand} ">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
      </a>
    </li>`
  }

class ProductListing{
    constructor(category,dataSource,listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init(){
        const list = await this.dataSource.getData();
        console.log(list);
        this.renderList(list);

    }
    renderList(list){
        const htmlStrings = list.map(productCardTemplate);
        this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    }
}
export default ProductListing;