
let countriesData = [];

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then(init);

function init(data) {
  countriesData = data;
  showData(data);
}

function showData(countriesArr) {
  console.log(countriesArr);
  document.querySelector(".card-container").innerHTML = "";

  countriesArr.forEach((countrie) => {
    const cardBody = `<div class="card-top">
                        <img
                            src=${countrie.flags.svg}
                            alt=${countrie.name.common} flag
                        />
                    </div>
                    <div class="card-bottom">
                        <h2>${countrie.name.common}</h2>
                        <p><span>Population:</span> ${Number(
                          countrie.population
                        ).toLocaleString("en-IN")}</p>
                        <p><span>Region:</span> ${countrie.region}</p>
                        <p><span>Capital:</span> ${countrie.capital}</p>
                    </div>`;

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = cardBody;
    document.querySelector(".card-container").appendChild(card);

    card.addEventListener("click", (e) => {
      location.href = `./countrie.html?countrieName=${countrie.name.common}`;
    });
  });
}

// searching feature

document
  .querySelector(".search-container")
  .lastElementChild.addEventListener("input", function (params) {
    showData(
      countriesData.filter(function (countrieObj) {
        return String(countrieObj.name.common)
          .toLowerCase()
          .includes(String(params.target.value).toLowerCase());
      })
    );
  });

// filtering feature 

function toggleDropdown() {
  let dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.style.display === "block"
    ? (dropdownContent.style.display = "none")
    : (dropdownContent.style.display = "block");
}

function selectOption(option) {
  let selectedOptionText = document.getElementById("selected-option");
  selectedOptionText.textContent = option;
  showData(countriesData.filter(function(countrie){
    return String(countrie.continents).toLowerCase().includes(option.toLowerCase())
  }))
  toggleDropdown(); // Close the dropdown after selecting an option
}