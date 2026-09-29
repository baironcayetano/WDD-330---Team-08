import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function shoppingCartTemplate (item){
    const cartItem = `
  <li class="cart-card divider">
    <a href="/product_pages/?product=${item.Id}">
	<h2 class="card__name">${item.Name}</h2>
   </a>
    <div class="cart-card__header">
      <button class="cart-card__delete" data-productId="${item.Id}"
  id="delete-button">X</button>
    </div>
    <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryLarge}"
      alt="${item.Name}"/>
    </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
    return cartItem;
};

function cartTotalTemplate (cart){
    let total = 0;
    cart.forEach(item =>{
        total += item.FinalPrice;
    });

    const totalTemplate = `<p class="cart-total"> Total: $${total.toFixed(2)}</p>`;
    return totalTemplate;
};

function emptyCartTemplate(){
   const template = `<p class="cart-total">There is nothing in your shopping cart!</p>`;
   return template;
};

export default class ShoppingCart{
    constructor(parentElementQuerySelector, totalElementQuerySelector){
        this.cart = getLocalStorage("so-cart");
        this.parentElement = document.querySelector(parentElementQuerySelector);
        this.totalElement = document.querySelector(totalElementQuerySelector);
    }

    init(){
	//for empty shopping carts
	if(!this.cart || this.cart.lenght <= 0){
	   this.renderEmptyCart();
	   return
	} 

	this.renderCart();
	this.renderTotal();
    }

    renderCart(){
        renderListWithTemplate(shoppingCartTemplate, this.parentElement, this.cart);
    }

    renderTotal(){
        this.totalElement.innerHTML = cartTotalTemplate(this.cart);
    }

    renderEmptyCart(){
	this.parentElement.innerHTML = emptyCartTemplate();
    }
} 
