const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async getAllData() {
    const categories = ["tents", "backpacks", "hammocks", "sleeping-bags"];
    const promises = [];
    categories.forEach((category) => promises.push(this.getData(category)));
    const results = await Promise.all(promises);
    return [...results[0], ...results[1], ...results[2], ...results[3]];
  }
  async searchData(searchString) {
    const allProducts = await this.getAllData();
    return allProducts.filter((product) =>
      product.Name.toLowerCase().includes(searchString.toLowerCase()),
    );
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
