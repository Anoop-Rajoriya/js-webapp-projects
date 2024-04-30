
const modeButton = document.querySelector(".mode-button");
const app = document.querySelector(".app-wraper");
const searchIcon = document.querySelector(".search-icon");
const arrowIcon = document.querySelector(".arrow");
const back = document.querySelector(".back-button");
let darkModeFlag = false;


if (JSON.parse(localStorage.getItem("darkmodeflag"))) darkModeFlag = true;

darkMode();

modeButton.addEventListener("click", function () {
  console.log("button clicked");
  darkMode();
});

function darkMode() {
  if (darkModeFlag) {
    app.classList.add("dark-mode");
    modeButton.innerHTML =
      '<img src="assets/light-mode-icon.svg" alt="" /> Light Mode';
    try {
      searchIcon.src = "./assets/dark-mode-search-icon.svg";
      arrowIcon.src = "./assets/down-arrow-dark-mode.svg";
    } catch (error) {
      back.firstElementChild.src = "./assets/back-arrow-icon-dark-mode.svg";
    }
    localStorage.setItem("darkmodeflag", darkModeFlag);
  } else {
    app.classList.remove("dark-mode");
    modeButton.innerHTML =
      '<img src="assets/dark-mode-icon.svg" alt="" /> Dark Mode';
    try {
      searchIcon.src = "./assets/light-mode-search-icon.svg";
      arrowIcon.src = "./assets/down-arrow-light-mode.svg";
    } catch (error) {
      console.log("element not found on this page;");

      back.firstElementChild.src = "./assets/back-arrow-icon-light-mode.svg";
    }
    localStorage.setItem("darkmodeflag", darkModeFlag);
  }

  darkModeFlag = !darkModeFlag;
}
