import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const shoppingCart = new ShoppingCart(".product-list", "#cart-total");
shoppingCart.init();
