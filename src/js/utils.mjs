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