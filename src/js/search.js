import ProductData from "./ProductData.mjs";
import SearchDetails from "./SearchDetails.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

// Create today's date
const today = new Date().toISOString().split("T")[0];

// Apply it to the input element
document.getElementById("date").setAttribute("max", today);

let param = getParam("date");

document.getElementById("date").value = param;

if (param) {
  const dataSource = new ProductData();
  const productList = new SearchDetails(dataSource, param);
  productList.init();
}
