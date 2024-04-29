function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.style.display === "block"
    ? (dropdownContent.style.display = "none")
    : (dropdownContent.style.display = "block");
}

function selectOption(option) {
  var selectedOptionText = document.getElementById("selected-option");
  selectedOptionText.textContent = option;
  toggleDropdown(); // Close the dropdown after selecting an option
}


let countriesData;

  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then(fecthData);

function fecthData(params) {
    countriesData = [...params];
    // console.log(countriesData[0].flags.svg);
    // console.log(countriesData[0].name.common);
    // console.log(countriesData[0]);
    countriesData.forEach(showData);
  }

function showData(countrie, index) {
//   console.log(index, countrie.flags.svg);
//   console.log(index, countrie.name.common);

  const cardBody = `<div class="card-top">
                        <img
                            src=${countrie.flags.svg}
                            alt=${countrie.name.common} flag
                        />
                    </div>
                    <div class="card-bottom">
                        <h2>${countrie.name.common}</h2>
                        <p><span>Population:</span> ${Number(countrie.population).toLocaleString("en-IN")}</p>
                        <p><span>Region:</span> ${countrie.region}</p>
                        <p><span>Capital:</span> ${countrie.capital}</p>
                    </div>`
                
    // console.log(card);
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = cardBody
    document.querySelector('.card-container').appendChild(card)


    card.addEventListener("click", (e) => {
        location.href = `./routs/countrie.html?countrieName=${countrie.name.common}`;
      });
}
