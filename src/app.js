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

  getForecast("Abuja");
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

  if (minutes < 10) {
  minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let inputForm = document.querySelector("#input-form");

  searchCity(inputForm.value);
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
    let apiKey = "9f0940fbf3ca3obdd306d133a0041aft";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = " ";

  response.data.daily.forEach((day,index) => {
    if (index < 5) {

forecastHtml =
  forecastHtml +
  `<div class="days">
            <div class="date">${formatDay(day.time)}</div>
            
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" alt="" width="62" />
             <div class="forecast-temp">
                <span class="forecast-temp-max"> <strong>${Math.round(day.temperature.maximum)}º
</strong></span>
                <span class="forecast-temp-min">${Math.round(day.temperature.minimum)}º</span>
              </div>
          </div>
          `;
    }
  });       

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Abuja");
