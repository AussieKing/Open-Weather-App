//! =========== STEP 1: CREATE (define) VARIABLES ===========

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const API_KEY = '912e462414bad344e84da69fdda45e52'; // get your API key from https://openweathermap.org/api

setInterval(() => {
    const time = new Date(); // create new const for time
    const month = time.getMonth(); // get month
    const date = time.getDate(); // get date
    const day = time.getDay(); // get day
    const hour = time.getHours(); // get hour
    let minutes = time.getMinutes(); // get minutes

    if (String(time.getMinutes()).length === 1){
        minutes = "0" + String(time.getMinutes())
    }

    timeEl.innerHTML = hour + ':' + minutes + ''; // update time
    dateEl.innerHTML = days[day] + ', ' + date + ' '+ months[month]; // update date

},1000); // called every second

function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude} = success.coords;
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res.json()).then(data => (
            
        console.log(data)
        ))

    })
};






// const timeEl = document.getElementById('time');
// const dateEl = document.getElementById('date');
// const currentWeatherItemsEl = document.getElementById('current-weather-items');
// const timezone = document.getElementById('time-zone');
// const countryEl = document.getElementById('country');
// const weatherForecastEl = document.getElementById('weather-forecast');
// const currentTempEl = document.getElementById('current-temp');
// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const API_KEY = '912e462414bad344e84da69fdda45e52'; // get your API key from https://openweathermap.org/api

// //! =========== STEP 2: SETUP (update time) ===========
// setInterval(() => {
//     const time = new Date(); // create new const for time
//     const month = time.getMonth(); // get month
//     const date = time.getDate(); // get date
//     const day = time.getDay(); // get day
//     const hour = time.getHours(); // get hour
//     let minutes = time.getMinutes(); // get minutes

//     if (String(time.getMinutes()).length === 1){
//         minutes = "0" + String(time.getMinutes())
//     }
//     // const hoursIn12HrFormat = hour >= 13 ? hour %12: hour // get hours in 12hr format //! OPTIONAL!
//     // const ampm = hour >= 12 ? 'PM' : 'AM' // get AM or PM get hours in 12hr format //! OPTIONAL!

//     timeEl.innerHTML = hour + ':' + minutes + ''; // update time
//     dateEl.innerHTML = days[day] + ', ' + date + ' '+ months[month]; // update date

// },1000); // called every second

// //! Debugging - check if minutes has the "0" in minutes
// // const time = new Date(); // create new const for time
// // console.log(String(time.getMinutes()).length);
// // if the length of string is 1, then add a "0" in front of it

// // creating a function to get the data : if it does, log it.
// function getWeatherData () {
//     navigator.geolocation.getCurrentPosition((success) => {
        
//         let {latitude, longitude} = success.coords;
        
//         fetch('api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid={API key}').then(res.json()).then(data => (
            
//         console.log(data)
//         ))

//     })
// };

function showWeatherData (data){

    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    currentWeatherItemsEl.innerHTML =
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${sunrise}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${sunset}</div>
    </div>;

}

