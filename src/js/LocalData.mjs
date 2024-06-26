function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
  
  export default class LocalData {
    constructor(category) {
      this.category = category;
      this.path = `../json/${this.category}.json`;
    }
    async getData() {
      const response = await fetch(this.path);
    const data = await convertToJson(response);
    return data;
    }
    async findProductById(id) {
      const products = await this.getData();
      return products.find((item) => item.Id === id);
    }
  }
  