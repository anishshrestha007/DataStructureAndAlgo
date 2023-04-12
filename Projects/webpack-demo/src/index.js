import _ from "lodash";
import "./style.css";

import header from "./header";

function component() {
  const element = document.createElement("div");
  element.id = "main-content";
  element.classList.add("main-content");

  element.appendChild(header());

  const bodyElement = document.createElement("div");
  bodyElement.id = "body-content";
  bodyElement.classList.add("body-content");
  element.appendChild(bodyElement);
  return element;
}

document.body.appendChild(component());
