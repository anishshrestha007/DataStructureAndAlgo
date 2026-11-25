import { getCurrentWeather } from "./script";

function home() {
  const homePage = document.createElement("div");
  homePage.classList.add("home-page");
  homePage.id = "home-page";
  const locationInput = document.createElement("input");
  locationInput.id = "location-input";
  locationInput.classList.add("location-input");
  locationInput.value = "London";
  const searchButton = document.createElement("button");
  searchButton.innerText = "Search";
  searchButton.classList.add("search-button");
  searchButton.id = "search-button";
  searchButton.onclick = handleSearchClick;
  const tempC = document.createElement("p");
  const condition = document.createElement("p");
  const conditionImage = document.createElement("img");
  tempC.id = "tempC";
  condition.id = "condition";
  conditionImage.id = "conditionImage";
  homePage.appendChild(locationInput);
  homePage.appendChild(searchButton);
  homePage.appendChild(tempC);
  homePage.appendChild(condition);
  homePage.appendChild(conditionImage);
  return homePage;
}

async function handleSearchClick() {
  const locationInput = document.getElementById("location-input");
  const homePage = document.getElementById("home-page");
  const tempC = document.getElementById("tempC");
  const condition = document.getElementById("condition");
  const conditionImage = document.getElementById("conditionImage");
  const currentWeather = await getCurrentWeather(
    locationInput === null ? undefined : locationInput.value
  );

  tempC.innerHTML = `Temperature Celsius : ${currentWeather.current.temp_c}`;

  condition.innerHTML = `Condition : ${currentWeather.current.condition.text}`;

  conditionImage.src = currentWeather.current.condition.icon;

  homePage.appendChild(tempC);
  homePage.appendChild(condition);
  homePage.appendChild(conditionImage);
}
export default home;
