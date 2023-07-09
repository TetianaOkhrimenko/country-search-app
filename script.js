"use strict";

//DOM elements
const heading = document.querySelector("h1");
const countriesContainer = document.querySelector(".countries_container");
const form = document.querySelector(".form");
const input = document.querySelector(".form input");
const errorMessage = document.querySelector(".error-msg");
const iconWrapper = document.querySelector(".icon-wrapper");
const modeButton = form.querySelector(".mode");

//VARIABLES

let mode = localStorage.getItem("mode") || "dark";
//let darkMode = localStorage.getItem("mode") || true;

//CLASSES
class API {
  async getCountry(country) {
    const response = await fetch(
      //`https://restcountries.com/v3.1/name/${country}?fullText=true`
      `https://restcountries.com/v3.1/name/${country}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(error.message);
    }

    return data;
  }
}

class UI {
  borderColors = [
    "#a696c8",
    "#2470a0",
    "#e94822",
    "#5fc9f3",
    "#a3f7bf",
    "#295f4e",
    "#f4e022",
    "#4f3b78",
    "#4ecca3",
    "#ff004d",
    "#ff847b",
  ];

  childrenCountriesContainer = countriesContainer.children;
  childrenCountriesContainerArray = Array.from(this.childrenCountriesContainer);

  getRandomColor(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random color
    const item = arr[randomIndex];
    return item;
  }

  showRandomColor(element, color) {
    element.style.borderColor = color;
    element.style.boxShadow = ` ${color} 0px 4px 10px`;
  }

  showCountry(country, index) {
    const countryBlock = document.createElement("div");
    countryBlock.classList.add("country-block");

    //if (country[index].name.common.length > 0) {
    countriesContainer.prepend(countryBlock);
    countryBlock.innerHTML = ` <div class='icon-wrapper'><img class='close-icon' src = './images/close-icon.png'></div>
      <img class='flag-image' src = '${country[index].flags.png}' alt='${
      country[index].flags.alt
    }'>
    <h4 class='country-heading'>${country[index].name.common} </h4>
    <p><span>Official name: </span>${country[index].name.official}</p>
      <p><span>Capital: </span>${country[index].capital || "uknown"}</p>
    <p><span>Population: </span>${+(
      country[index].population / 1000000
    ).toFixed(2)} mln</p>
     <p><span>Continent: </span>${country[index].continents[0] || "uknown"}</p>
     <p><span>Currency: </span>${
       country[index].currencies[Object.keys(country[index].currencies)].name ||
       "uknown"
     } (${Object.keys(country[index].currencies)[0] || "uknown"})</p>
     <p><span>Languages: </span>${
       Object.values(country[index].languages)
         .toString()
         .split(",")
         .join(", ") || "uknown"
     }</p>`;
    /*
<p><span>Find on a map: </span><a href='${
      country[index].maps.googleMaps
    }' class='map-link' target='_blank'>🏳️‍🌈Click here</a></p>
    */

    //if (darkMode) {
    if (localStorage.getItem("mode") === "dark") {
      //this.setDarkMode();
      this.showRandomColor(
        countryBlock,
        this.getRandomColor(this.borderColors)
      );
      return;
    } else {
      this.showRandomColor(countryBlock, "rgb(116 169 221)");
      countryBlock.style.borderColor = "transparent";
      //this.setLightMode();
      const cardParagraphAll = document.querySelectorAll(".country-block p");
      const cardSpanAll = document.querySelectorAll(".country-block p span ");
      Array.from(cardParagraphAll).forEach((paragraph) => {
        paragraph.style.color = "#2b4450";
      });
      Array.from(cardSpanAll).forEach((span) => {
        span.style.color = "#2b4450";
      });
    }
    //  }
  }

  smoothlyClearUi(html, time) {
    //const countryCard = document.querySelector(".country-block");
    //countryCard.style.display = "none";
    html.style.animation = `fadeIn ease ${time}s`;
    html.style.animationFillMode = "forwards";
    setTimeout(() => (html.style.display = "none"), time * 1000);
  }

  setLightMode() {
    document.body.style.background = "#eaeaea";
    document.body.style.color = "#2b4450";
    this.childrenCountriesContainerArray.forEach((card) => {
      this.showRandomColor(card, "rgb(116 169 221)");
      card.style.borderColor = "transparent";
      const cardParagraphAll = document.querySelectorAll(".country-block p");
      const cardSpanAll = document.querySelectorAll(".country-block p span ");
      Array.from(cardParagraphAll).forEach((paragraph) => {
        paragraph.style.color = "#2b4450";
      });
      Array.from(cardSpanAll).forEach((span) => {
        span.style.color = "#2b4450";
      });
    });
    input.style.border = "1px solid #6bbbff";
    input.style.color = "#2b4450";
    input.classList.add("light-mode");
    heading.classList.add("light-mode-heading");
    heading.classList.remove("dark-mode-heading");
  }

  setDarkMode() {
    document.body.style.background =
      "radial-gradient(circle at 24.1% 68.8%,rgb(50, 50, 50) 0%,rgb(0, 0, 0) 99.4%)";
    document.body.style.color = "#ffffff";
    this.childrenCountriesContainerArray.forEach((card) => {
      this.showRandomColor(card, this.getRandomColor(this.borderColors));
      const cardParagraphAll = document.querySelectorAll(".country-block p");
      const cardSpanAll = document.querySelectorAll(".country-block p span ");
      Array.from(cardParagraphAll).forEach((paragraph) => {
        paragraph.style.color = "#c1c0b9";
      });
      Array.from(cardSpanAll).forEach((span) => {
        span.style.color = "rgb(255, 255, 255)";
      });
    });
    input.style.border = "1px solid #ffffff";
    input.style.color = "#ffffff";
    input.classList.add("dark-mode");
    input.classList.remove("light-mode");
    heading.classList.add("dark-mode-heading");
    heading.classList.remove("light-mode-heading");
  }
}

if (mode === "dark") {
  const imageModeButton = form.querySelector(".mode img");
  const ui = new UI();
  imageModeButton.src = "./images/night-mode.png";
  ui.setDarkMode();
  localStorage.setItem("mode", "dark");
} else {
  const imageModeButton = form.querySelector(".mode img");
  const ui = new UI();
  imageModeButton.src = "./images/light-mode.png";
  ui.setLightMode();
  localStorage.setItem("mode", "light");
}

//EVENTS

//1.Event on submit form
form.addEventListener("submit", async (event) => {
  const inputCountry = input.value.trim();
  const ui = new UI();
  const countryCardAll = countriesContainer.querySelectorAll(".country-block");
  const countryCardArray = Array.from(countryCardAll);

  try {
    event.preventDefault();
    errorMessage.textContent = "";
    console.log(inputCountry);

    if (countryCardArray.length > 0) {
      /* countryCardArray.forEach((card) => {
        if (
          card
            .querySelector(".country-heading")
            .textContent.toUpperCase()
            .trim() === inputCountry.toUpperCase()
        ) {
          errorMessage.textContent = "This country is already shown";
          return;
        }
      });*/

      const existingCountry = countryCardArray.find((item) => {
        const countryName = item.querySelector(".country-heading").textContent;
        return (
          countryName.toUpperCase().trim() === inputCountry.toUpperCase() ||
          countryName.toUpperCase().trim().includes(inputCountry.toUpperCase())
        );
      });
      if (existingCountry && inputCountry.length !== 0) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "This country is already shown";
        ui.smoothlyClearUi(errorMessage, 5);
        return;
      }
    }

    const api = new API();
    const countryAPI = await api.getCountry(inputCountry);
    console.log(countryAPI);

    for (let index = 0; index < countryAPI.length; index++) {
      ui.showCountry(countryAPI, index);
    }
    //ui.showCountry(countryAPI, 0);

    //const closeIcon = document.querySelectorAll(".close-icon");

    //2.Event on clicking close icon on card
    countriesContainer.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.className === "close-icon") {
        //ui.clearCountry();
        // const countryCard = document.querySelector(".country-block");
        const countryCard = event.target.closest(".country-block");
        ui.smoothlyClearUi(countryCard, 1.5);
        setTimeout(() => {
          countryCard.remove();
        }, 1500);
        //event.target.closest(".country-block").style.display = "none";
        //countryCard.style.display = "none";
      }
    });
    /* closeIcon.forEach((icon) => {
      icon.addEventListener("click", () => {
        ui.clearCountry();
        console.log("Done");
      });
    });*/
  } catch (error) {
    if (inputCountry.length === 0) {
      errorMessage.style.display = "block";
      errorMessage.textContent = `Input field is still empty 🙄`;
      ui.smoothlyClearUi(errorMessage, 5);
    } else {
      errorMessage.style.display = "block";
      errorMessage.textContent = `Please enter a valid name of country!`;
      ui.smoothlyClearUi(errorMessage, 5);
    }
  } finally {
    form.reset();
    input.focus();
  }
});

//Event on clicking button to change mode - dark/light
modeButton.addEventListener("click", (event) => {
  event.preventDefault();
  const imageModeButton = form.querySelector(".mode img");
  const ui = new UI();

  if (localStorage.getItem("mode") === "light") {
    localStorage.setItem("mode", "dark");
    imageModeButton.src = "./images/night-mode.png";
    ui.setDarkMode();
  } else {
    localStorage.setItem("mode", "light");
    imageModeButton.src = "./images/light-mode.png";
    ui.setLightMode();
  }
  /*if (darkMode) {
    imageModeButton.src = "./images/light-mode.png";
    localStorage.setItem("mode", darkMode);
    darkMode = false;
    ui.setLightMode();
  } else {
    localStorage.setItem("mode", darkMode);
    darkMode = true;
    imageModeButton.src = "./images/night-mode.png";
    ui.setDarkMode();
  }*/
});
