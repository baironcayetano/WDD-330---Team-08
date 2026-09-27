import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const productsTitle = document.querySelector("#products-title");

const category = getParam("category") || "tents";
productsTitle.textContent = `Top Products: ${category}`;

const listElement = document.querySelector("#top-products");
const dataSource = new ProductData(category);
const list = new ProductList(category, dataSource, listElement);
list.init();
