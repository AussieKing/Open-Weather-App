# Aussie's Open Weather Hub

This application provides the user with the current weather and a five-day forecast of a selected city. 
It allows the user to search for a city (providing auto suggestions if city name is in different countries), and once the city is selected, the city is saved to a list of recent searches. 

## Table of Contents

- [Features](#features)
- [Installation and Usage](#installation-and-usage)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Live URL and Repository](#live-url-and-repository)
- [Credits](#credits)
- [Contributing](#contributing)
- [License](#license)

## Features

 This app will run in the client browser and features HTML (dynamic) and CSS via jQuery, Bootstrap, Javascript and external APIs (Day.js for date and time, and OpenWeatherMap for weather forecast).

 It saves data in the user's local storage, so that the search history remains on screen when returning/refreshing. Weather data gets updated.

The application has the following features:

- It has a Search button that allows the user to search for a city
  - It auto-suggests the name/country when the user is typing.
- It selects a custom image depending on which city the user types, by modifiying thr HTML string.
- It has a Current Weather section that displays the current weather for the selected city
  - The section is populated with the following data from the OpenWeather API:
    - City and Country name
    - The Date at the user's location
    - OpenWeatherMaps's representative weather icon and description
    - Temperature details
      - Current temperature
      - Minimum temperature
      - Maximum temperature
    - Humidity
    - Wind speed
- It has a Five Day Forecast section that displays the weather forecast for the selected city for the next five days
  - The section is populated with the following data from the OpenWeather API:
    - OpenWeatherMaps's representative Weather icon and Description
    - Temperature details
    - Humidity  
    - Wind speed

## Installation and Usage

Clone the repository to your local machine and open the `index.html` file in your browser to view the city weather hub application, or go to the [live site](#live-url-and-repository).

Open the application in your web browser and use the interface as described above.

## Technologies Used

- HTML
- CSS
- Bootstrap CSS Framework
  - Responsive Design
  - UI Components
- JavaScript
  - DOM Manipulation
  - Event Listeners
  - Event Handlers
  - Local Storage
  - Functions
  - Classes
  - API Calls
- Day.js
  - Date and Time Library
- jQuery
  - DOM Manipulation

## Screenshots

### Search bar and Auto-complete

### Selected city

### 5 Days Weather Forecast

### Custom background image depending on city searched

### Desktop Browser - Showing the Search History List



## Live URL and Repository

The live application can be accessed at the following URL: [Aussie's Open Weather Hub](https://)

The repository can be accessed at the following URL: [Open-Weather-App](https://)

## Credits

- OpenWeatherMap.org for the weather data: [OpenWeather API](https://openweathermap.org/api)

- Bootstrap for the responsive UI elements and CSS framework - [Bootstrap 5.2.3](https://getbootstrap.com/)

- Day.js v1.11.7 for the date and time library: [Day.js](https://day.js.org/)

- jQuery v3.6.4 for the JavaScript library: [jQuery](https://jquery.com/)

- unsplash for providing the free images to use as background [unsplash] (https://unsplash.com/)

## License

This project is licensed under the terms of the MIT license.

© 2023 AussieKing