import home from "./home";

import contact from "./contact";

const PAGES = { home, about: contact };

// Swaps the page shown in #body-content and marks the matching nav tab as current.
function showPage(name) {
  const bodyElement = document.getElementById("body-content");
  const page = PAGES[name] || PAGES.home;

  bodyElement.replaceChildren(page());

  document.querySelectorAll("[data-page]").forEach((tab) => {
    const active = tab.dataset.page === name;
    tab.setAttribute("aria-current", active ? "page" : "false");
  });
}

function handleHeaderClick(e) {
  const tab = e.target.closest("[data-page]");
  if (!tab) return;
  e.preventDefault();
  showPage(tab.dataset.page);
}

export { handleHeaderClick, showPage };
