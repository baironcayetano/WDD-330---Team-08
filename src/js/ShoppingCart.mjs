import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function shoppingCartTemplate (item){
    const cartItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"/>
    </a>
    <a href="#">
        <h2 class="card__name">${item.Name}</h2>
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
}

export default class ShoppingCart{
    constructor(parentElementQuerySelector, totalElementQuerySelector){
        this.cart = getLocalStorage("so-cart");
        this.parentElement = document.querySelector(parentElementQuerySelector);
        this.totalElement = document.querySelector(totalElementQuerySelector);
    }

    init(){
        this.renderCart();
        if(this.cart.length > 0){ this.renderTotal(); }
    }

    renderCart(){
        renderListWithTemplate(shoppingCartTemplate, this.parentElement, this.cart);
    }

    renderTotal(){
        this.totalElement.innerHTML = cartTotalTemplate(this.cart);
    }

    
} 