"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const renderCountry = function (data, className = "") {
  console.log(data);
  const html = `       
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${Object.values(data.name)[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
      </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${Object.values(data.name)[0]}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${
//               Object.values(data.languages)[0]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.values(data.currencies)[0].name
//             }</p>
//           </div>
//       </article>`;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData("iran");
// getCountryData("japan");
// getCountryData("south korea");

///////////////////////////////////////
/*
const getCountryANDneighbour = function (country) {
  //ajax call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);
    //get neighbour country7
    const neighbour = data.borders;
    if (!neighbour) return;

    //ajax call country 2
    neighbour.forEach((el) => {
      const request2 = new XMLHttpRequest();
      request2.open("GET", `https://restcountries.com/v3.1/alpha/${el}`);
      request2.send();
      request2.addEventListener("load", function () {
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, "neighbour");
      });
    });
  });
};
// getCountryANDneighbour("iran");
// getCountryANDneighbour("japan");
getCountryANDneighbour("south korea");*/

//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

// const req = fetch("https://restcountries.com/v3.1/name/canada");
// console.log(req);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getCountryData = function (country) {
  //country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      if (!data[0].borders) return;
      const neighbour = data[0].borders[0];

      //country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then(([data]) => renderCountry(data, "neighbour"))
    .catch((error) => {
      console.error(error);
      renderError("something went wrong try again!");
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
      // for loading circels
    });
};
getCountryData("usa");
