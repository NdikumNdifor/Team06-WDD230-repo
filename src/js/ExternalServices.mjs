const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const response = await res.json();
  if (res.ok) {
    return response;
  } else {
    throw {name: "servicesError", message: response};
  }
}

export default class ExternalServices {
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

  async checkout(orderObject){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderObject)
    }
    return fetch(baseURL + "checkout/", options).then((res) => convertToJson(res))
    // return fetch("https://wdd330-backend.onrender.com:3000/checkout", options);
  }
}
