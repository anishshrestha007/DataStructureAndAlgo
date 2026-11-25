import { WEATHER_API, API_VERSION, API_KEY, CURRENT_WEATHER_URL } from "./settings";

// Fetches current weather for a place name, postcode or "lat,lon".
// Throws an Error with a readable message on any failure.
export async function getCurrentWeather(location = "London") {
  if (!API_KEY) {
    throw new Error(
      "No API key. Copy .env.example to .env, add your WeatherAPI key, then restart npm start."
    );
  }

  let response;
  try {
    response = await fetch(
      `${WEATHER_API}${API_VERSION}${CURRENT_WEATHER_URL}?key=${API_KEY}&q=${encodeURIComponent(
        location
      )}&aqi=no`
    );
  } catch (e) {
    const error = new Error("Couldn't reach the weather service. Check your internet connection.");
    error.retryable = true; // worth trying again, unlike a bad key or unknown place
    throw error;
  }

  const data = await response.json();
  // WeatherAPI answers bad keys and unknown places with { error: { message } }
  if (data.error) {
    throw new Error(
      data.error.code === 1006 ? `No place called "${location}" was found.` : data.error.message
    );
  }
  return data;
}
