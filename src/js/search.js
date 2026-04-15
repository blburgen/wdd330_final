import ProductData from "./ProductData.mjs";
import SearchDetails from "./SearchDetails.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// loads the header and footer for the page
loadHeaderFooter();

// Create yesterday's date
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

// Apply it to the input element so that it is the max day allowed for the input
document.getElementById("date").setAttribute("max", yesterday);

// Gets the searched date from the parameters
let param = getParam("date");

// Sets the search date to the one submitted by the user
document.getElementById("date").value = param;

// If there is a date set by the user the information will be rendered on the page
if (param) {

  if(param > yesterday){
    document.querySelector(".loading").classList.remove("hidden");
    document.querySelector(".loading").innerText = "Date must be in the past" 
  } else {
    document.querySelector(".loading").classList.remove("hidden");
    const dataSource = new ProductData();
    const productList = new SearchDetails(dataSource, param);
    productList.init();
  }
  
}
