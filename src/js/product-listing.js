import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import Alert from "./alert.mjs";
import { loadHeaderFooter, getParams, getElement } from "./utils.mjs";

const main = async () => {
  const category = getParams("category");
  const categoryTitle = category[0].toUpperCase() + category.slice(1);
  getElement("#category-title").textContent = categoryTitle;
  const dataSource = new ProductData();
  const listElement = document.querySelector(".product-list");
  const productList = new ProductListing(category, dataSource, listElement);
  await productList.init();
  const tents = productList.products;
  const topFourTentIds = ["880RR", "985RF", "985PR", "344YJ"];
  const topFourTents = tents.filter((product) =>
    topFourTentIds.includes(product.Id),
  );
  productList.renderList(topFourTents);

  // const dataSource1 = new ProductData("alerts");
  // const alerts = new Alert("alerts", dataSource1);
  // alerts.init();
  await loadHeaderFooter();
};

main();
