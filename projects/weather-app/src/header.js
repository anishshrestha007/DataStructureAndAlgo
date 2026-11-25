import { handleHeaderClick } from "./script";

const LOGO = `
<svg class="logo" viewBox="0 0 32 32" aria-hidden="true">
  <circle cx="12" cy="12" r="6" fill="#fbbf24"/>
  <g stroke="#fbbf24" stroke-width="2" stroke-linecap="round">
    <path d="M12 2v2M12 20v2M2 12h2M4.9 4.9l1.4 1.4M17.7 4.9l-1.4 1.4M4.9 19.1l1.4-1.4"/>
  </g>
  <path d="M11 27a5 5 0 0 1 .6-10 7 7 0 0 1 13.2 2.5A4 4 0 0 1 24 27z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.5"/>
</svg>`;

function header() {
  const headerContainer = document.createElement("header");
  headerContainer.id = "header-container";
  headerContainer.classList.add("header-container");
  headerContainer.onclick = handleHeaderClick;
  headerContainer.innerHTML = `
  <a class="brand" href="#" data-page="home">${LOGO}<span>Weather</span></a>
  <nav class="tabs" aria-label="Main">
    <a href="#" data-page="home">Weather</a>
    <a href="#" data-page="about">About</a>
  </nav>
`;

  return headerContainer;
}

export default header;
