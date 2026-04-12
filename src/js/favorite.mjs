import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const favoritelist = getLocalStorage('favorite-cart');

let favorite = document.getElementById('favorite');

for(let i=0; i<favoritelist.length; i++){
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = favoritelist[i].url;
    img.alt = favoritelist[i].media_type + " of " + favoritelist[i].title;

    const p = document.createElement('p');
    p.innerHTML = `${favoritelist[i].title} <br> &copy;${favoritelist[i].date} <br> <a href=${favoritelist[i].hdurl}>${favoritelist[i].hdurl}</a><br><br>${favoritelist[i].explanation}`;

    div.appendChild(img);
    div.appendChild(p);
    favorite.appendChild(div);
};