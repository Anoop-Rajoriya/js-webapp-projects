// console.log(location.search.split('='));
const countrieName = location.search.split("=")[1];
const flageImage = document.querySelector(".image-section img");
const countrieTitle = document.querySelector("#countrie-name");
const countriesDetailsElm = document.querySelector(".countrie-details-section");
const countrieBorderDetailsElm = document.querySelector(
  ".border-countries-lables"
);

// if(n.includes("%20")) console.log(n.split('%20').join(' '));
// else console.log(n);

fetch(`https://restcountries.com/v3.1/name/${countrieName}?fullText=true`)
  .then((res) => res.json())
  .then(showData);

function showData([countrie]) {
    console.log(countrie);

  flageImage.src = countrie.flags.svg;
  countrieTitle.innerText = countrie.name.common;

  const sectionDetails = [
    "name",
    "population",
    "region",
    "subregion",
    "capital",
    "demonyms",
    "currencies",
    "languages",
    "borders",
  ];
  const countriesDetailsData = {};

  for (const iterator of sectionDetails)
    countriesDetailsData[iterator] = countrie[iterator];

  console.log(countriesDetailsData.borders);  

  const countriesDetailsHTML = `<section>
                                    <p><b>Native Name: </b>${
                                      countriesDetailsData.name.common
                                    }</p>
                                    <p><b>Population: </b>${Number(
                                      countriesDetailsData.population
                                    ).toLocaleString("en-IN")}</p>
                                    <p><b>Region: </b>${
                                      countriesDetailsData.region
                                    }</p>
                                    <p><b>Sub Region: </b>${
                                      countriesDetailsData.subregion
                                    }</p>
                                    <p><b>Capital: </b>${
                                      countriesDetailsData.capital
                                    }</p>
                                </section>
                                <section>
                                    <p><b>Top Level Domain: </b>${
                                      Object.values(
                                        countriesDetailsData.demonyms.eng
                                      )[0]
                                    }</p>
                                    <p><b>Currecies: </b>${
                                      Object.values(
                                        countriesDetailsData.currencies
                                      )[0].name
                                    }</p>
                                    <p><b>Languages: </b>${String(
                                      Object.values(
                                        countriesDetailsData.languages
                                      )
                                    )
                                      .split(",")
                                      .join(", ")}</p>
                                 </section>`;

  countriesDetailsElm.innerHTML = countriesDetailsHTML;
  // console.log(countriesDetailsHTML);
 try {
  countriesDetailsData.borders.forEach((element) => {
    // console.log(element);
    fetch(`https://restcountries.com/v3.1/alpha/${element}`)
      .then((res) => res.json())
      .then((data) => {
        const borderButton = document.createElement("button");
        borderButton.innerText = data[0].name.common;
        countrieBorderDetailsElm.appendChild(borderButton);
        borderButton.addEventListener("click", (e) => {
          location.href = `./countrie.html?countrieName=${data[0].name.common}`;
        });
      });
  });
 } catch (error) {
  const borderButton = document.createElement("button");
        borderButton.innerText = "border not available!";
        countrieBorderDetailsElm.appendChild(borderButton);
        console.log("error: " + 'border not available.');
 }
}
