function searchCountry() {
    var searchInput = document.getElementById("searchinput").value.trim();
    var apiUrl = "https://restcountries.com/v3.1/name/" + searchInput;
    fetch(apiUrl)
    .then(function(response) { return response.json(); })
    .then(function(data) { showResults(data); });
}

function showResults(data) {
    var resultsContainer = document.getElementById("resultscontainer");
    resultsContainer.textContent = ""; 
    for (var i = 0; i < data.length; i++) {
        var country = data[i];
        var newDiv = document.createElement("div");
        var currencies = "N/A";
        if (country.currencies) {
            var currencyList = [];
            for (var code in country.currencies) {
                if (country.currencies.hasOwnProperty(code)) {
                    currencyList.push(country.currencies[code].name);
                }
            }
            currencies = currencyList.join(", ");
        }
        var languages = "N/A";
        if (country.languages) {
            var languageList = [];
            for (var lang in country.languages) {
                if (country.languages.hasOwnProperty(lang)) {
                    languageList.push(country.languages[lang]);
                }
            }
            languages = languageList.join(", ");
        }
        var capital = country.capital ? country.capital.join(", ") : "N/A";
        var population = country.population.toLocaleString();
        newDiv.innerHTML = "<h2>" + country.name.common + "</h2>" +
                           "<img src='" + country.flags.png + "' alt='Flag of " + country.name.common + "' width='150'><br>" +
                           "<strong>Capital:</strong> " + capital + "<br>" +
                           "<strong>Population:</strong> " + population + "<br>" +
                           "<strong>Region:</strong> " + country.region + "<br>" +
                           "<strong>Currency:</strong> " + currencies + "<br>" +
                           "<strong>Languages:</strong> " + languages + "<br><br>";
        newDiv.classList.add("countrycard");
        resultsContainer.appendChild(newDiv);
    }
}