import "./style.css";

import header from "./header";
import { showPage } from "./script";

function component() {
  const element = document.createElement("div");
  element.id = "main-content";
  element.classList.add("main-content");

  element.appendChild(header());

  const bodyElement = document.createElement("main");
  bodyElement.id = "body-content";
  bodyElement.classList.add("body-content");
  element.appendChild(bodyElement);

  const footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.innerHTML =
    'Weather data from <a href="https://www.weatherapi.com/" target="_blank" rel="noopener">WeatherAPI.com</a>';
  element.appendChild(footer);
  return element;
}

document.documentElement.lang = "en";
document.body.appendChild(component());
showPage("home");
