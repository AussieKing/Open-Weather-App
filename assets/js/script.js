const APIKey = "912e462414bad344e84da69fdda45e52";
const citySearch = document.querySelector("#city-search");
var currentCity = document.querySelector("#currentCity");

// ******* Locate the city ********
const cityList = document.querySelector("#city-list");

citySearch.addEventListener("keyup", event => {
  const query = event.target.value;
  if (query.length > 2) {

    const url = `https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${APIKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const cities = data.list;
        cityList.innerHTML = "";
        cities.forEach(city => {
          const li = document.createElement("li");
          li.textContent = `${city.name}, ${city.sys.country}`;
          li.addEventListener("click", () => {
            citySearch.value = `${city.name}, ${city.sys.country}`;
            cityList.innerHTML = "";
          });
          cityList.appendChild(li);
        });
      })
      .catch(error => console.error(error));
  }
});


function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No Weather Found");
      }
    })
    .then(data => {
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + city.name + "')";
      const date = new Date(data.dt * 1000);
      const formattedDate = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
      const temperature = data.main.temp;
      const tempMin = data.main.temp_min;
      const tempMax = data.main.temp_max;
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;

      // Display forecasted weather!
      const weatherDataElement = document.getElementById("selected-city");
      weatherDataElement.innerHTML = `
        <h3>${city}</h3> 
        <per>${formattedDate}</per>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
      <div class=minMax>
        <per>Min Temp: ${tempMin} &deg;C</per><p></p>
        <per>Max Temp: ${tempMax} &deg;C</per><p></p>
      </div>  
        <p>Temperature: ${temperature} &deg;C</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Humidity: ${humidity} %</p>
      `;
    })
}


// ******* 5-Day Forecast *******
function getForecast() {

  const city = document.getElementById("city-search").value;

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error getting forecast data");
      }
    })
    .then(data => {
      const forecastList = data.list;

      const fiveDayForecast = forecastList.filter((item, index) => {
        return index % 8 === 0;
      });

      const forecastDataElement = document.getElementById("future-forecast");
      forecastDataElement.innerHTML = "";
      fiveDayForecast.forEach(item => {
        const timestamp = item.dt * 1000;
        const date = new Date(timestamp);
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        const iconCode = item.weather[0].icon;
        const temperature = item.main.temp;
        const windSpeed = item.wind.speed;
        const humidity = item.main.humidity;

        forecastDataElement.innerHTML += `
          <div class="forecast-item">
            <h5>${dayOfWeek}</h5>
            <img src="http://openweathermap.org/img/w/${iconCode}.png">
            <p>Temperature: ${temperature} &deg;C</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Humidity: ${humidity} %</p>
          </div>
        `;
      });
    })
}


//  ***** Call the function on button click *****
$("#search-button").on("click", function () {

  const city = document.getElementById("city-search").value;
  getWeather(city);
  getForecast();
});


//  ****** Local Storage and create buttons ****
function saveCities() {
  const newCity = $("#city-search").val();
  // Check if the value is empty
  if (!newCity.trim()) {
    return;
  }

  let savedCities = JSON.parse(localStorage.getItem("city")) || [];

  if (!savedCities.includes(newCity)) {
    savedCities = savedCities.filter(city => city !== newCity);
    savedCities.unshift(newCity);
    // Maximum of 6 cities as per assesment requirements
    if (savedCities.length > 6) {
      savedCities.pop();
    }

    localStorage.setItem("city", JSON.stringify(savedCities));
  }
}


// ***** Create buttons of previous searches *****
function displayCitiesButtons() {
  $("#city-saved").empty();
  const savedCities = JSON.parse(localStorage.getItem("city")) || [];

  savedCities.forEach((city, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = city;
    btn.onclick = () => {
      savedCities.splice(index, 1);
      savedCities.unshift(city);
      localStorage.setItem("city", JSON.stringify(savedCities));
      $("#city-search").val(city);
      getWeather(city);
      getForecast();
      displayCitiesButtons();
    };

    $("#city-saved").append(btn);
  });
}

// **** Keep the buttons on screen by Local Storage ****
displayCitiesButtons();


// ***** Load the page with Adelaide forecast *****
window.onload = function () {
  city = document.getElementById("city-search");
  city.value = "Brisbane, AU";
  getWeather("Brisbane, AU");
  getForecast();
  city.value = '';
};


