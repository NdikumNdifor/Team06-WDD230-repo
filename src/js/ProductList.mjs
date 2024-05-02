function productCardTemplate(product){
    return `
    <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
        <img src="" alt="image of $${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductListing{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.init();
    }

    renderList(products){
        this.listElement.innerHtml += products.map(productCardTemplate);
    }

    async init(){
        const list = await this.dataSource.getData();
        this.renderList(list);
        
    }
}