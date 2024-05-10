import ProductData from "./ProductData.mjs";

import {getParams} from "./utils.mjs";

import ProductListing from "./ProductList.mjs"
import Alert from "./alert.mjs";



const main = async () => {
  const category = getParams("category");
  const dataSource = new ProductData(category);
  const listElement = document.querySelector(".product-list")
  const productList = new ProductListing(category, dataSource, listElement);
  await productList.init();

  productList.renderList(productList.data);


  const dataSource1 = new ProductData("alerts")
  const alerts = new Alert("alerts", dataSource1)
  alerts.init();
}

main();

