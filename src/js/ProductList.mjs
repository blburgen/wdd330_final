import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(item) {
  const newItem = `
    <div>
    <img
      src=${item.url}
      alt=${item.title}
    >
    <p>
      &copy;${item.date}
      <a href=${item.hdurl}>
        ${item.url}
      </a>
    </p>
    <caption>${item.explanation}</caption>
    </div>
  `;

  return newItem;
}

export default class ProductList {
  constructor(dataSource, listElement) {
    console.log(dataSource);
    console.log(listElement);
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);

    // const listlength = list.length;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
