import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const category = "tents";
const listElement = document.querySelector(".product-list");

const dataSource = new ProductData(category);
const list = new ProductList(category, dataSource, listElement);
list.init();
