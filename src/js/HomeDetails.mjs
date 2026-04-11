import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class HomeDetails {

  constructor(dataSource, listElement) {
    this.listElement = listElement;
    this.product = {};
    this.solar = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.getData();
    this.solar = await this.dataSource.getSolarData();
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("favorite-cart") || [];
    for(let i = 0; i < cartItems.length; i++){
      if(cartItems[i].date === this.product.date)
        return;
    };
    cartItems.push(this.product);
    setLocalStorage("favorite-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product, this.solar);
  }
}

function productDetailsTemplate(product, solar) {
  document.getElementById('hero').src = product.url;
  document.getElementById('hero').alt = product.title;

  document.getElementById('copy').textContent = product.date;
  document.getElementById('imagelink').href = product.hdurl;
  document.getElementById('imagelink').textContent = product.hdurl;

  document.getElementById('information').innerHTML = product.explanation;
  if(solar){
    document.getElementById('solar').innerHTML = `Last Solar Flare ID: ${solar.flrID}<br>
    Begin Time: ${solar.beginTime}<br>
    End Time: ${solar.endTime}<br>
    Peak Time: ${solar.peakTime}<br>
    Class Type: ${solar.classType}
    `;
  }
 

}