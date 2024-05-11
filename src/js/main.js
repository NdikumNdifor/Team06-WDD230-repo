import ProductData from "./ProductData.mjs";
import ProductIconData from "./ProductIconData.mjs"
import ProductIconListing from "./ProductIconListing.mjs";
import Alert from "./alert.mjs";
import { loadHeaderFooter } from "./utils.mjs"

const main = async () => {
  const category = "icons";
  const dataSource = new ProductIconData(category);
  const listElement = document.querySelector(".product-list")
  const iconList = new ProductIconListing(dataSource, listElement);
  await iconList.init();
  const icons = iconList.data;
  iconList.renderList(icons);


  const dataSource1 = new ProductData("alerts")
  const alerts = new Alert("alerts", dataSource1)
  alerts.init();
  await loadHeaderFooter();
}

main();
