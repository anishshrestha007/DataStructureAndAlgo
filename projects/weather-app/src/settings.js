export const WEATHER_API = "https://api.weatherapi.com/";
export const API_VERSION = "v1/";
// Filled in at build time from WEATHER_API_KEY in .env (see webpack.config.js).
// Never paste the key here: this file is committed.
export const API_KEY = process.env.WEATHER_API_KEY;
export const CURRENT_WEATHER_URL = "current.json";
