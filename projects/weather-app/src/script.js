import home from "./home";

import contact from "./contact";

import {
  WEATHER_API,
  API_VERSION,
  API_KEY,
  CURRENT_WEATHER_URL,
} from "./settings";

function appendBodyElement(element) {
  const bodyElement = document.getElementById("body-content");

  if (bodyElement.lastChild != null)
    bodyElement.removeChild(bodyElement.lastChild);
  bodyElement.appendChild(element());
}

function handleHeaderClick(e) {
  switch (e.target.id) {
    case "header-label-first":
      appendBodyElement(home);
      break;
    case "header-label-second":
      appendBodyElement(contact);
      break;

    default:
      break;
  }
}

async function getCurrentWeather(location = "London") {
  let weather = await fetch(
    `${WEATHER_API}${API_VERSION}${CURRENT_WEATHER_URL}?key=${API_KEY}&q=${location}&aqi=no`
  );
  let response = await weather.json();
  return response;
}

export { handleHeaderClick, getCurrentWeather };
