function weatherUpdate(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  let date = new Date(response.data.time * 1000);

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = currentDate(date);
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} alt="Weather Icon" />`;
  
}

function searchCity(city) {
  let apiKey = "9f0940fbf3ca3obdd306d133a0041aft";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(weatherUpdate);
}
function currentDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
//i was never sure this is going to work, self findings☺️☺️☺️
  if (hour < 10 || minutes < 10) {
   hour = `0${hour}`; minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let inputForm = document.querySelector("#input-form");

  searchCity(inputForm.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Abuja");
