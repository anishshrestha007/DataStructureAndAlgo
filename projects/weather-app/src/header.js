import { handleHeaderClick } from "./script";

function header() {
  const headerContainer = document.createElement("div");
  headerContainer.id = "header-container";
  headerContainer.onclick = handleHeaderClick;
  headerContainer.classList.add("header-container");
  headerContainer.innerHTML = `
  <div class="header-nail" id="header-tl"></div>
  <div class="header-nail" id="header-tr"></div>
  <div class="header-nail" id="header-bl"></div>
  <div class="header-nail" id="header-br"></div>

  <input type="radio" name="header-name" id="header-first"></input>
  <label id="header-label-first" for="header-first">Home</label>

  <input type="radio" name="header-name" id="header-second"></input>
  <label id="header-label-second" for="header-second">About Us</label>
`;

  return headerContainer;
}

export default header;
