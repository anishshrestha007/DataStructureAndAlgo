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
  if (!API_KEY) {
    throw new Error(
      "No API key. Copy .env.example to .env, add your WeatherAPI key, then restart npm start."
    );
  }
  let weather = await fetch(
    `${WEATHER_API}${API_VERSION}${CURRENT_WEATHER_URL}?key=${API_KEY}&q=${encodeURIComponent(
      location
    )}&aqi=no`
  );
  let response = await weather.json();
  // WeatherAPI answers bad keys and unknown places with { error: { message } }
  if (response.error) throw new Error(response.error.message);
  return response;
}

export { handleHeaderClick, getCurrentWeather };
