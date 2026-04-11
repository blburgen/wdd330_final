const baseURL = import.meta.env.VITE_SERVER_URL;
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}

  async getData() {
    const date = new Date().toISOString().slice(0,10);
    let data;
    if(getLocalStorage('today') === null){
      const response = await fetch(baseURL);
      console.log(response);
      data = await convertToJson(response);
      if(data.date == date){
        console.log(data.explanation);
      } else{
        console.log("hi");
      }
      setLocalStorage('today', data);
    } else {
      data = getLocalStorage('today');
    }
    return data;
  }
}
