function contact() {
  const contactPage = document.createElement("section");
  contactPage.classList.add("contact-page", "card");
  contactPage.id = "contact-page";
  contactPage.innerHTML = `
    <h1>About</h1>
    <p>
      A small weather app built with plain JavaScript modules and webpack. Search for any
      city, postcode or airport code to see what the weather is doing right now.
    </p>
    <h2>Where the data comes from</h2>
    <p>
      Current conditions come from
      <a href="https://www.weatherapi.com/" target="_blank" rel="noopener">WeatherAPI.com</a>.
      Readings are updated every 15 minutes or so.
    </p>
    <h2>Tips</h2>
    <ul>
      <li>Switch between °C and °F with the toggle on the result card.</li>
      <li>Your last few searches are kept as shortcuts under the search box.</li>
    </ul>
  `;
  return contactPage;
}

export default contact;
