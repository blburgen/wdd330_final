const baseURL = import.meta.env.VITE_SERVER_URL;
const solarURL = import.meta.env.VITE_SERVER_URL2;
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
    const date = new Date(Date.now() - 40000000).toISOString().slice(0,10);
    let data;
    if(getLocalStorage('today') === null || getLocalStorage('today').date != date){
      const response = await fetch(baseURL);
      data = await convertToJson(response);
      setLocalStorage('today', data);
    } else {
      data = getLocalStorage('today');
    }
    return data;
  }

  async getSolarData(){
    const response = await fetch(solarURL);
    if(response.status == 503){
      console.log(response);
      console.log("Error: Status 503 Service Unavailable")
      return null;
    }
    const data = await convertToJson(response);
    setLocalStorage('solar', data);
    return data[data.length - 1];
  }

  async getDataByDate(param) {
    const response= await fetch(`${baseURL}&date=${param}`);
    if(response.status == 503){
      const loading = document.querySelector(".loading");
      loading.innerHTML("Server Not responding.  Please refresh page or choose a different date.")
      console.log(response);
      console.log("Error: Status 503 Service Unavailable")
      return null;
    }
    const data = await convertToJson(response);
    return data;
  }
}
