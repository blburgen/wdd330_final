import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderFavorites() {
  let favoritelist = getLocalStorage("favorite-cart");
  let favorite = document.getElementById("favorite");
  for (let i = 0; i < favoritelist.length; i++) {
    const div = document.createElement("div");
    div.classList = "item";
    let img;
    if (favoritelist[i].media_type == "image") {
      img = document.createElement("img");
      img.src = favoritelist[i].url;
      img.alt = favoritelist[i].media_type + " of " + favoritelist[i].title;
    } else if (favoritelist[i].media_type == "video") {
      img = document.createElement("video");
      img.width = "360";
      const source = document.createElement("source");
      source.src = favoritelist[i].url;
      source.type = "video/mp4";
      img.appendChild(source);
    }
    const p = document.createElement("p");
    if (favoritelist[i].media_type == "image") {
      p.innerHTML = `${favoritelist[i].title} <br> &copy;${favoritelist[i].date} <br> <a href=${favoritelist[i].hdurl}>${favoritelist[i].hdurl}</a><br><br>${favoritelist[i].explanation}`;
    } else if (favoritelist[i].media_type == "video") {
      p.innerHTML = `${favoritelist[i].title} <br> &copy;${favoritelist[i].date} <br> <a href=${favoritelist[i].url}>${favoritelist[i].url}</a><br><br>${favoritelist[i].explanation}`;
    }
    div.appendChild(img);
    div.appendChild(p);
    const div1 = document.createElement("div");
    const button = document.createElement("button");
    button.id = "removeFromoCart";
    button.innerHTML = "Remove from Favorites";
    const itemDate = favoritelist[i].date;
    button.addEventListener("click", () => {
      const updatedList = favoritelist.filter((item) => item.date !== itemDate);
      setLocalStorage("favorite-cart", updatedList);
      favorite.innerHTML = "";
      renderFavorites();
    });
    div1.appendChild(button);
    div.appendChild(div1);
    favorite.appendChild(div);
  }
}

renderFavorites();
