import home from "./home";

import menu from "./menu";

import contact from "./contact";

function appendBodyElement(element) {
  const bodyElement = document.getElementById("body-content");
  bodyElement.innerHTML = element();
}

function handleHeaderClick(e) {
  console.log("Hello");
  switch (e.target.id) {
    case "header-label-first":
      appendBodyElement(home);
      break;
    case "header-label-second":
      appendBodyElement(menu);
      break;
    case "header-label-third":
      appendBodyElement(contact);
      break;
    default:
      break;
  }
}

export { handleHeaderClick };
