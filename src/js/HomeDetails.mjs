import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class HomeDetails {

  constructor(dataSource, listElement) {
    this.listElement = listElement;
    this.product = {"copyright":"",
      "date":"2026-04-04",
      "explanation":"From pole to pole our fair planet is captured in this snapshot from space, an evocative image from a window of the Orion spacecraft Integrity. From the spacecraft's perspective the Sun is moving behind Earth's bright limb along the lower right. Africa and the Iberian peninsula are in view on the pale blue planet's surface, while aurorae crown Earth's south and north poles at top right and bottom left. Commander Reid Wiseman took the historic picture on Artemis II mission flight day 2 (April 2), after the completion of the planned translunar injection burn. That burn boosted the spacecraft out of Earth orbit, sending Integrity and crew on a trajectory that will take them around the Moon and back again. That's a journey humans last made over 50 years ago. (Editor's note: Venus is photobombing Wiseman's historic pic. Currently appearing in our western skies after sunset, the inner planet is in the frame below and right of Earth's bright limb, immersed in a faint band of zodiacal light.)",
      "hdurl":"https://apod.nasa.gov/apod/image/2604/art002e000192.jpg",
      "media_type":"image",
      "service_version":"v1",
      "title":"Hello World",
      "url":"https://apod.nasa.gov/apod/image/2604/art002e000192_1050.jpg"};
    this.solar = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.getData();
    
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    const cartItems = getLocalStorage("favorite-cart") || [];
    for(let i = 0; i < cartItems.length; i++){
      if(cartItems[i].date === this.product.date){
        document.getElementById('addToCart').innerText = "Image in Favorites";
      };
    };

    this.solar = await this.dataSource.getSolarData();
    this.renderSolarDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("favorite-cart") || [];
    for(let i = 0; i < cartItems.length; i++){
      if(cartItems[i].date === this.product.date){
        document.getElementById('addToCart').innerText = "Image in Favorites";
        return;
      };
    };
    cartItems.push(this.product);
    setLocalStorage("favorite-cart", cartItems);
    document.getElementById('addToCart').innerText = "Image in Favorites";
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }

  renderSolarDetails(){
    solarDetailsTemplate(this.solar)
  }
}

function productDetailsTemplate(product) {
  document.getElementById('hero').src = product.url;
  const alternate = product.media_type + " of " + product.title;
  document.getElementById('hero').alt = alternate;

  document.getElementById('title').textContent = product.title;
  document.getElementById('copy').textContent = product.date;
  document.getElementById('imagelink').href = product.hdurl;
  document.getElementById('imagelink').textContent = product.hdurl;

  document.getElementById('information').innerHTML = product.explanation;
  
}

function solarDetailsTemplate(solar) {
  if(solar){
    document.getElementById('solar').innerHTML = `<span class="bold">Last Solar Flare ID:</span> <br>${solar.flrID}<br><br>
    <span class="bold">Begin Time:</span> ${solar.beginTime}<br>
    <span class="bold">End Time:</span> ${solar.endTime}<br>
    <span class="bold">Peak Time:</span> ${solar.peakTime}<br>
    <span class="bold">Class Type:</span> ${solar.classType}
    `;
  }
  else if(solar === null){
    document.getElementById('solar').innerHTML = `<span class="bold">Flare Data not available from NASA</span>(503 Service Unavailable)`;
  }
}