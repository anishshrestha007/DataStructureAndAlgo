import { getCurrentWeather } from "./api";

const STORAGE = { last: "weather:last", recent: "weather:recent", unit: "weather:unit" };
const MAX_RECENT = 5;

// localStorage can be blocked (private mode), so every access is guarded.
function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (e) {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    /* ignore */
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

let unit = load(STORAGE.unit, "c");
let lastWeather = null;
let requestId = 0;

function home() {
  const homePage = document.createElement("section");
  homePage.classList.add("home-page");
  homePage.id = "home-page";
  homePage.innerHTML = `
    <form class="search" role="search" novalidate>
      <label for="location-input" class="visually-hidden">City, postcode or airport code</label>
      <div class="search-field">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input id="location-input" class="location-input" type="search" name="q"
          placeholder="Search a city, postcode or airport" autocomplete="off" enterkeyhint="search" />
      </div>
      <button class="search-button" id="search-button" type="submit">Search</button>
    </form>
    <div class="recent" id="recent"></div>
    <div class="result" id="result" aria-live="polite"></div>
  `;

  const form = homePage.querySelector("form");
  const input = homePage.querySelector("#location-input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    search(homePage, input.value);
  });

  homePage.querySelector("#recent").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-place]");
    if (!chip) return;
    input.value = chip.dataset.place;
    search(homePage, chip.dataset.place);
  });

  renderRecent(homePage);

  // Show something useful straight away: the last place searched, or London.
  const last = load(STORAGE.last, "London");
  input.value = last;
  if (lastWeather && lastWeather.location.name === last) renderWeather(homePage, lastWeather);
  else search(homePage, last);

  return homePage;
}

async function search(homePage, rawQuery) {
  const query = rawQuery.trim();
  const result = homePage.querySelector("#result");
  if (!query) {
    renderError(homePage, "Type a city, postcode or airport code to search.", null);
    homePage.querySelector("#location-input").focus();
    return;
  }

  const id = ++requestId;
  const button = homePage.querySelector("#search-button");
  button.disabled = true;
  button.textContent = "Searching…";
  result.setAttribute("aria-busy", "true");
  result.innerHTML = `
    <div class="card weather-card skeleton" aria-hidden="true">
      <div class="sk sk-title"></div><div class="sk sk-line"></div>
      <div class="sk sk-temp"></div>
      <div class="sk-stats"><div class="sk"></div><div class="sk"></div><div class="sk"></div><div class="sk"></div></div>
    </div>
    <p class="visually-hidden">Loading weather for ${escapeHtml(query)}…</p>`;

  try {
    const weather = await getCurrentWeather(query);
    if (id !== requestId) return; // a newer search started meanwhile
    lastWeather = weather;
    save(STORAGE.last, weather.location.name);
    addRecent(weather.location.name);
    renderRecent(homePage);
    renderWeather(homePage, weather);
  } catch (error) {
    if (id !== requestId) return;
    renderError(homePage, error.message, error.retryable ? query : null);
  } finally {
    if (id === requestId) {
      button.disabled = false;
      button.textContent = "Search";
      result.removeAttribute("aria-busy");
    }
  }
}

function addRecent(place) {
  const recent = load(STORAGE.recent, []).filter((p) => p.toLowerCase() !== place.toLowerCase());
  recent.unshift(place);
  save(STORAGE.recent, recent.slice(0, MAX_RECENT));
}

function renderRecent(homePage) {
  const recent = load(STORAGE.recent, []);
  const container = homePage.querySelector("#recent");
  container.hidden = recent.length === 0;
  container.innerHTML =
    '<span class="recent-label">Recent</span>' +
    recent
      .map(
        (place) =>
          `<button type="button" class="chip" data-place="${escapeHtml(place)}">${escapeHtml(place)}</button>`
      )
      .join("");
}

function renderError(homePage, message, retryQuery) {
  const result = homePage.querySelector("#result");
  result.innerHTML = `
    <div class="card error-card" role="alert">
      <p><strong>Couldn't load the weather.</strong> ${escapeHtml(message)}</p>
      ${retryQuery ? '<button type="button" class="btn-secondary" id="retry">Try again</button>' : ""}
    </div>`;
  const retry = result.querySelector("#retry");
  if (retry) retry.addEventListener("click", () => search(homePage, retryQuery));
}

function renderWeather(homePage, weather) {
  const { location, current } = weather;
  const isC = unit === "c";
  const temp = Math.round(isC ? current.temp_c : current.temp_f);
  const feels = Math.round(isC ? current.feelslike_c : current.feelslike_f);
  const wind = isC ? `${Math.round(current.wind_kph)} km/h` : `${Math.round(current.wind_mph)} mph`;
  const icon = "https:" + current.condition.icon.replace("64x64", "128x128");
  const place = [location.region, location.country].filter(Boolean).join(", ");
  const localTime = (location.localtime || "").split(" ")[1] || "";
  const updated = (current.last_updated || "").split(" ")[1] || "";

  const result = homePage.querySelector("#result");
  result.innerHTML = `
    <article class="card weather-card ${current.is_day ? "is-day" : "is-night"}">
      <header class="weather-head">
        <div>
          <h1 class="place">${escapeHtml(location.name)}</h1>
          <p class="region">${escapeHtml(place)}</p>
        </div>
        <div class="unit-toggle" role="group" aria-label="Temperature unit">
          <button type="button" data-unit="c" aria-pressed="${isC}">°C</button>
          <button type="button" data-unit="f" aria-pressed="${!isC}">°F</button>
        </div>
      </header>

      <div class="now">
        <img src="${escapeHtml(icon)}" alt="" width="96" height="96" />
        <div>
          <p class="temp" id="tempC">${temp}<span class="deg">°${isC ? "C" : "F"}</span></p>
          <p class="condition" id="condition">${escapeHtml(current.condition.text)}</p>
        </div>
      </div>

      <dl class="stats">
        <div><dt>Feels like</dt><dd>${feels}°</dd></div>
        <div><dt>Humidity</dt><dd>${current.humidity}%</dd></div>
        <div><dt>Wind</dt><dd>${wind} <small>${escapeHtml(current.wind_dir)}</small></dd></div>
        <div><dt>UV index</dt><dd>${current.uv}</dd></div>
      </dl>

      <p class="updated">Local time ${escapeHtml(localTime)} · Updated ${escapeHtml(updated)}</p>
    </article>`;

  result.querySelector(".unit-toggle").addEventListener("click", (e) => {
    const button = e.target.closest("[data-unit]");
    if (!button || button.dataset.unit === unit) return;
    unit = button.dataset.unit;
    save(STORAGE.unit, unit);
    renderWeather(homePage, weather);
    result.querySelector(`[data-unit="${unit}"]`).focus();
  });
}

export default home;
