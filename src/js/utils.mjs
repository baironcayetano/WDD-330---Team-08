// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/** return a parameter from the URL */
export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlParam = urlParams.get(param);
  return urlParam;
}

/**Renders the list elements using the given template
 * @param templateFunc {function}
 * @param parentElement {HTMLElement}
 * @param list {Array}
 * @param position {"afterbegin" | "beforebegin" | "beforeend" | "afterend"}
 * @param clear {boolean}
 */
export function renderListWithTemplate(templateFunc, parentElement, list, position="afterbegin", clear=false){
    if(clear){
      parentElement.innerHTML = "";
    }
    const content = list.map(element => templateFunc(element)).join();
    parentElement.insertAdjacentHTML(position,content);
}

/**Renders with the given template and data
 * @param {string}template
 * @param {HTMLElement} parentElement 
 * @param {any} data
 * @param {Function} callback
 */
export function renderWithTemplate(template, parentElement, data, callback){
    parentElement.innerHTML = template;
    if(callback){
      callback(data);
    }
}

/** Retrieves the template from the given path
 * @param {string} path
 * @returns {string | null}
 */
export async function loadTemplate(path){
  try{
      const res = await fetch(path);
      const template = await res.text();
      return template;
  }catch(error){
      return null;
  }
}

/** Insert number of items in cart **/
export function loadItemsInCart(){
  const items = getLocalStorage("so-cart") || null;
  const count = items ? items.length : 0;
  const counterElement = document.getElementById("items-in-cart");
  counterElement.textContent = count;
};

/** Inserts the header and the footer */
export async function loadHeaderFooter(){
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");

  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  if(!headerTemplate){
    console.error("Error rendering header") 
    return;
  } else if (!footerTemplate){
    console.error("Error rendering footer");
    return;
  }

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  //show the quantity of items in the shopping cart
  //over the cart icon in the header element.
  loadItemsInCart();
};


