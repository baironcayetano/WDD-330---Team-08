import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = "tents";
const listElement = document.querySelector(".product-list");

const dataSource = new ProductData(category);
const list = new ProductList(category, dataSource, listElement);
list.init();
