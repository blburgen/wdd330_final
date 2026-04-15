import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class SearchDetails {

  constructor(dataSource, param) {
    this.product = {};
    this.dataSource = dataSource;
    this.param = param
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.getDataByDate(this.param);
    
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    // document
    //   .getElementById('addToCart')
    //   .addEventListener('click', this.addProductToCart.bind(this));
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("favorite-cart") || [];
    for(let i = 0; i < cartItems.length; i++){
      if(cartItems[i].date === this.product.date){
        return;
      }
    };
    cartItems.push(this.product);
    setLocalStorage("favorite-cart", cartItems);
    document.getElementById("addToCart").innerHTML = "Image in Favorites";
    document.getElementById("addToCart").disabled = true;
  }

  async renderProductDetails() {
    const div = document.createElement("div");
    div.classList.add("card");
    let img;
    // determins if the image is a video or a regular image
    if(this.product.media_type == "video"){
      img = document.createElement("video");
      img.width = "360";
      const source = document.createElement("source");
      source.src = this.product.url;
      source.type = "video/mp4";
      img.appendChild(source);
    } else {
      img = document.createElement("img");
      img.src = this.product.url;
      const alternate = this.product.media_type + " of " + this.product.title;
      img.alt = alternate;
    }

    const p = document.createElement("p");
    // determins if the image is a video is so the regular url is used
    if(this.product.media_type == "video"){
      p.innerHTML = `&copy;${this.product.date} <a href=${this.product.url}>${this.product.url}</a><br>
      ${this.product.explanation}`;
    }else{
      p.innerHTML = `&copy;${this.product.date} <a href=${this.product.hdurl}>${this.product.hdurl}</a><br>
      ${this.product.explanation}`;
    }
    div.appendChild(img);
    div.appendChild(p);
    const hero = document.getElementById("hero");
    const div1 = document.createElement("div");
    const button = document.createElement("button");
    button.id = "addToCart";
    const cartItems = getLocalStorage("favorite-cart") || [];
    button.innerHTML = "Add to Favorites";
    for(let i = 0; i < cartItems.length; i++){
      if(cartItems[i].date === this.product.date){
        button.innerHTML = "Image in Favorites";
        button.disabled = true;
        break;
      }
      
    };
    div1.appendChild(button);
    hero.appendChild(div);
    hero.appendChild(div1);
    
    
    document.querySelector(".loading").classList.add("hidden");
  }

}
