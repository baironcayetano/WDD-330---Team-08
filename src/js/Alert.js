import { addFunctionalityToButtons, convertToJson } from "./utils.mjs";

/**
 * Returns the alerts in html so that they can be rendered in the DOM
 * @param {Array<{message:string, backgroundColor:string, color:string}>} alerts
 * @returns {HTMLElement} template
 */
function alertsTemplate(alerts) {
  const template = document.createElement("section");
  template.classList.add("alert-list");
  template.setAttribute(
    "style",
    `color:${alerts[0].color}; background-color:${alerts[0].backgroundColor};"`,
  );
  template.innerHTML = `
        <div class="alert-list__header">
           <button class="alert-list__close" id="close-alert">&times;</button>
        </div>
        ${alerts.map((alert) => alertTemplate(alert)).join("")}`;
  return template;
}

/**
 * Returns the alert in html so that it can be rendered in a component
 * or directly in the DOM
 * @param {{message:string, backgroundColor:string, color:string}} alert
 * @returns {string} alert template
 */
function alertTemplate(alert) {
  const template = `
       <p class="alert">
            ${alert.message}
       </p>
    `;
  return template;
}

/**
 * Renders alerts in the DOM when it's needed.
 */
export default class Alert {
  /**
   *@param {source} source - The source of the alerts
   */
  constructor(source) {
    this.parentElement = document.querySelector("main");
    this.source = source;
    this.alerts = null; //default
  }

  async init() {
    if (!this.source) return;

    //getting information from the source
    try {
      const alertResponse = await fetch(this.source);
      const alertData = await convertToJson(alertResponse);
      this.alerts = alertData;
    } catch (error) {
      //notifying the user that the system was not able to load the alerts from the source
      this.alerts = [
        {
          message: "Error loading notifications",
          backgroundColor: "red",
          color: "white",
        },
      ];
    }

    //rendering the alerts in the DOM
    const template = alertsTemplate(this.alerts);
    this.parentElement.insertAdjacentElement("afterbegin", template);
    addFunctionalityToButtons("#close-alert", this.closeAlerts);
  }

  closeAlerts() {
    const alertList = document.querySelector(".alert-list");
    if (alertList) {
      alertList.remove();
    }
  }
}
