import ProductData from "./ProductData.mjs";
import HomeDetails from "./HomeDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();


const dataSource = new ProductData();
const listElement = document.getElementById("IOD");
const productList = new HomeDetails(dataSource, listElement);
productList.init();