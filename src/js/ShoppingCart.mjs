import { getLocalStorage, setLocalStorage, renderListWithTemplate, addFunctionalityToButtons } from "./utils.mjs";

function shoppingCartTemplate (item){
    const cartItem = `
  <li class="cart-card divider">
    <a href="/product_pages/?product=${item.Id}">
	<h2 class="card__name">${item.Name}</h2>
   </a>
    <div class="cart-card__header">
      <button class="cart-card__delete delete-button" id="${item.Id}">&times;</button>
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

/**
 * Deletes an item from the shopping cart
 * @param {Event} clickEvent 
 */
function deleteItemFromCart(clickEvent){
    const productId = clickEvent.target.id;
    
    //It should work and retreive the productId from the dataset
    // but this is the safest way to get to handle errors and avoid unexpected behaviors.
    if(!productId){
        //notify the user
        alert("Something went wrong. Please try again.");
        return;
    } 

    const cart = getLocalStorage("so-cart");

    //This is not the way to do it but it works for now.
    //The best way is using a Map and check if the quantity of the product is 
    //greater than 1, if so, decrease the quantity by 1,
    //otherwise, remove the product from the cart.
    const newCart = cart.filter(item => item.Id !== productId);
    setLocalStorage("so-cart", newCart);

    //notify the user
    alert("This item has been removed from your cart");

    //re-render the cart and the total
    const newShoppingCart = new ShoppingCart(".product-list","#cart-total");
    newShoppingCart.init();

    //TODO: show the quantity of items in the bag Icon
    
}

export default class ShoppingCart{
    constructor(parentElementQuerySelector, totalElementQuerySelector){
        this.cart = getLocalStorage("so-cart");
        this.parentElement = document.querySelector(parentElementQuerySelector);
        this.totalElement = document.querySelector(totalElementQuerySelector);
    }

    init(){
	//for empty shopping carts
	if(!this.cart || this.cart.length <= 0){
	   this.renderEmptyCart();
	   return
	} 

	this.renderCart();
	this.renderTotal();
    }

    renderCart(){
        renderListWithTemplate(shoppingCartTemplate, this.parentElement, this.cart, true);
        addFunctionalityToButtons(".delete-button", deleteItemFromCart);
    }

    renderTotal(){
        this.totalElement.innerHTML = cartTotalTemplate(this.cart);
    }

    renderEmptyCart(){
	this.parentElement.innerHTML = emptyCartTemplate();
    this.totalElement.innerHTML = "";
    }

} 
