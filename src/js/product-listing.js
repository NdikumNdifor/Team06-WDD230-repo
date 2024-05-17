import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs"
import { loadHeaderFooter, getParams, capitalizingAString} from "./utils.mjs"


const main = async () => {

  const category = getParams("category");
  // console.log(category);
  const dataSource = new ProductData(category);
  const listElement = document.querySelector(".product-list");
  const productList = new ProductListing(category, dataSource, listElement);
  await productList.init();


  // productList.renderList(productList.data);

  
//   const tents = productList.products;
//   const topFourTentIds = ["880RR", "985RF", "985PR", "344YJ"];
//   const topFourTents = tents.filter((product) => topFourTentIds.includes(product.Id))
//   productList.renderList(topFourTents);


  const dataSource1 = new ProductData("alerts")
  const alerts = new Alert("alerts", dataSource1)
  alerts.init();
  
 dynamicProductTitle(category);
 await loadHeaderFooter();

}

function dynamicProductTitle(category){
  const listElement = document.querySelector(".title");
  listElement.textContent =   `Top Products: ${capitalizingAString(category)}`;
}

main();