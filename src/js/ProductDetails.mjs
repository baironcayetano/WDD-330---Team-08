import { getLocalStorage, setLocalStorage } from "./utils.mjs"

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    /**There are a few things that need to happen before the class can be used. Some will happen in the constructor, automatically. 
     * Other Others need to be controlled and will be placed in this init method. */
    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        //adds a listenner to the addToCart button
        document.getElementById("addToCart")
                .addEventListener("click", this.addProductToCart.bind(this));
    }

    /** Adds a product to cart */
    addProductToCart(){
        const products = getLocalStorage("so-cart") || [];
        products.push(this.product);
        setLocalStorage("so-cart", products);
    }

    /**Method to generate or populate the HTML to display the product details. */
    renderProductDetails(){
        const productTemplate = document.querySelector("#product-detail-template");
        const productDetails = document.querySelector(".product-detail");

        const cloneNode = productTemplate.content.cloneNode(true);
        const [brandName, productName, image, price, color, description] = cloneNode.querySelectorAll("h3, h2, img, p, p, p");

        brandName.textContent = this.product.Brand.Name;
        productName.textContent = this.product.NameWithoutBrand;
        image.alt = this.product.NameWithoutBrand;
        image.src = this.product.Image;
        price.textContent = `$${this.product.FinalPrice}`;
        color.textContent = this.product.Colors[0].ColorName;
        description.innerHTML = this.product.DescriptionHtmlSimple;
        productDetails.appendChild(cloneNode);

        document.getElementById("addToCart").dataset.id = this.productId;
    }

}