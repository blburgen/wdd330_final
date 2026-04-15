import ProductData from "./ProductData.mjs";
import HomeDetails from "./HomeDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

//renders the header and footer
loadHeaderFooter();

// renders the homepage
const dataSource = new ProductData();
const listElement = document.getElementById("IOD");
const productList = new HomeDetails(dataSource, listElement);
productList.init();
