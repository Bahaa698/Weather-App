"use strict"

// & Declare inputs Variable
let search = document.querySelector("#search");
let btnSearch = document.querySelector("#btnSearch");

// & Declare Today Variable
let todayDayName = document.querySelector("#todayDayName");
let todayDate = document.querySelector("#TodayDate");
let todayMonth = document.querySelector("#TodayMonth");
let userLocation = document.querySelector("#userLocation");
let todayTemp = document.querySelector("#todayTemp");
let todayIcon = document.querySelector("#todayIcon");
let todayWeather = document.querySelector("#todayWeather");
let humidity = document.querySelector("#humidity");
let windKph = document.querySelector("#windKph");
let windDirection = document.querySelector("#windDirection");


// & Declare next days variables
let nextTodayName = document.getElementsByClassName("next-today-name");
let nextTodayImg = document.getElementsByClassName("next-today-img");
let nextTodayMaxTemp = document.getElementsByClassName("next-today-max-temp")
let nextTodayMinTemp = document.getElementsByClassName("next-today-min-temp");
let nextTodayWeather = document.getElementsByClassName("next-today-weather");

btnSearch.addEventListener("click", function () {
    displayWeather();
})

search.addEventListener("input", function () {
    if (search.value.length >= 3)
        displayWeather();
});

async function fetchWeatherData(value) {
    let fetchData = await
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=074a4d1e79eb499c9b4162552231208&q=${value}&days=3`);


    let weatherData = await fetchData.json();
    return weatherData;
}



function displayTodayData(data) {



    let date = new Date(data.forecast.forecastday[0].date);


    todayDayName.innerHTML = date.toLocaleDateString("en-us", { weekday: 'long' });


    todayDate.innerHTML = date.getDate();


    todayMonth.innerHTML = date.toLocaleDateString("en-us", { month: 'long' })

    userLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayIcon.setAttribute("src", data.current.condition.icon);
    todayWeather.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    windKph.innerHTML = data.current.wind_kph + "km/h";
    windDirection.innerHTML = data.current.wind_dir
}


function displayNextDaysData(data) {


    let forecastData = data.forecast.forecastday;


    for (let i = 0; i < 2; i++) {

        let nextDate = new Date(forecastData[i + 1].date);  // Date
        nextTodayName[i].innerHTML = nextDate.toLocaleDateString("en-us", { weekday: 'long' }); // Date

        nextTodayImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
        nextTodayMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
        nextTodayMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
        nextTodayWeather[i].innerHTML = forecastData[i + 1].day.condition.text;
    }

}



async function displayWeather(pos) {
    let weatherData = await fetchWeatherData(pos ? pos : search.value);
    displayTodayData(weatherData);
    displayNextDaysData(weatherData);
}



function showPosition(currentPosition) {
    let position = (currentPosition.coords.latitude) + "," + (currentPosition.coords.longitude);
    displayWeather(position)
}

function error() {
    alert("Geolocation is not supported by this browser.");
}

function locateUserPosition() {
    navigator.geolocation.getCurrentPosition(showPosition, error);
}
locateUserPosition();
