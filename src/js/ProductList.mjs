import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    const hasDiscount = product.FinalPrice < product.SuggestedRetailPrice;
    let priceContent = `<p class="product-card_price">$${product.FinalPrice}</p>`;
    
    //adding discount percentage
    if(hasDiscount){
	 const discountPercent = parseInt((product.FinalPrice / product.SuggestedRetailPrice) * 100); 
         priceContent += `<p class="card__suggested-retail-price">$${product.SuggestedRetailPrice}</p>`;
         priceContent += `<p class="card__discount">${discountPercent}% OFF</p>`;
    }
    
   //final template
    return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      ${priceContent}
    </a>
  </li>`;
}

export default class ProductList{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;  
    }

    async init(){
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }

    renderList(productList){
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
    }
}
