const APIKey = process.env.OPENWEATHERMAP_API_KEY;
const cityList = document.querySelector("#cities-list");
const searchCity = document.querySelector("#search-city");
var currentCity = document.querySelector("#currentCity");

searchCity.addEventListener("keyup", event => {
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
            searchCity.value = `${city.name}, ${city.sys.country}`;
            cityList.innerHTML = "";
          });
          cityList.appendChild(li);
        });
      })
      .catch(error => console.error(error));
  }
});

function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No Weather Found. Try again!");
      }
    })
    .then(data => {
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city}')`;
      const date = new Date(data.dt * 1000);
      const formattedDate = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
      const humidity = data.main.humidity;
      const temperature = data.main.temp;
      const tempMax = data.main.temp_max;
      const tempMin = data.main.temp_min;
      const windSpeed = data.wind.speed;

      // Display weather for called city
      const weatherEl = document.getElementById("city-selected");
      weatherEl.innerHTML = `
        <h3>${city}</h3> 
        <per>${formattedDate}</per>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <div class="minMax">
          <p>Humidity: ${humidity} %</p>
          <p>Max Temp: ${tempMax} &deg;C</p>
          <p>Min Temp: ${tempMin} &deg;C</p>
        </div>  
        <p>Temperature: ${temperature} &deg;C</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    })
    .catch(error => console.error(error));
}

function getForecastFiveDays() {
  const city = document.getElementById("search-city").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No Weather Found. Try again!");
      }
    })
    .then(data => {
      const forecastList = data.list;
      const fiveDayForecast = forecastList.filter((item, index) => index % 8 === 0);

      const forecastDataElement = document.getElementById("upcoming-forecast");
      forecastDataElement.innerHTML = "";
      fiveDayForecast.forEach(item => {
        const timestamp = item.dt * 1000;
        const date = new Date(timestamp);
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        const iconCode = item.weather[0].icon;
        const temperature = item.main.temp;
        const windSpeed = item.wind.speed;
        const humidity = item.main.humidity;
        
        console.log(dayOfWeek);

        forecastDataElement.innerHTML += `
          <div class="forecast-card">
            <h5>${dayOfWeek}</h5>
            <img src="http://openweathermap.org/img/w/${iconCode}.png">
            <p>Humidity: ${humidity} %</p>
            <p>Temperature: ${temperature} &deg;C</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
          </div>
        `;
      });
    })
    .catch(error => console.error(error));
}

$("#search-btn").on("click", function () {
  const city = document.getElementById("search-city").value;
  fetchWeather(city);
  getForecastFiveDays();
});


// Save Cities in LOCAL STORAGE
function saveCities() {
  const newCity = $("#search-city").val().trim();
  if (!newCity) {
    return;
  }

  let savedCities = JSON.parse(localStorage.getItem("city")) || [];

  if (!savedCities.includes(newCity)) {
    savedCities = savedCities.filter(city => city !== newCity);
    savedCities.unshift(newCity);
    // Maximum of 6 cities as per assessment requirements
    if (savedCities.length > 6) {
      savedCities.pop();
    }
    localStorage.setItem("city", JSON.stringify(savedCities));
  }
}


// Previous searches
function displayCitiesButtons() {
  $("#saved-city").empty();
  const savedCities = JSON.parse(localStorage.getItem("city")) || [];

  savedCities.forEach((city, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = city;
    btn.onclick = () => {
      savedCities.splice(index, 1);
      savedCities.unshift(city);
      localStorage.setItem("city", JSON.stringify(savedCities));
      $("#search-city").val(city);
      fetchWeather(city);
      getForecastFiveDays();
      displayCitiesButtons();
    };

    $("#saved-city").append(btn);
  });
}

// using Brisbane as the default city
window.onload = function () {
  const cityInput = document.getElementById("search-city");
  cityInput.value = "Brisbane, AU";
  fetchWeather("Brisbane, AU");
  getForecastFiveDays();
  cityInput.value = '';
};

// displaying previous searches as per the assessment demo
displayCitiesButtons();

