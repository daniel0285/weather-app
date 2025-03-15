import './styles.scss';

const convertToCelsius = function convertToCelsius(fahrenheit) {
  const celsius = (fahrenheit - 32) * (5 / 9);
  return celsius.toFixed(2);
};

const displayData = function displayData(data) {
  const weatherInfo = document.querySelector('.weather-info');
  const description = document.getElementById('description');
  const locationName = document.getElementById('locationName');
  const temperature = document.getElementById('temperature');
  const feelsLike = document.getElementById('feelsLike');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');

  const tempData = convertToCelsius(data.currentConditions.temp);
  const feelsLikeData = convertToCelsius(data.currentConditions.feelslike);
  const addressArr = data.resolvedAddress.split(',');
  const city = addressArr[0];
  const country = `, ${addressArr[addressArr.length - 1]}` || ' ';

  weatherInfo.classList.remove('hidden');
  weatherInfo.classList.add('show');
  description.textContent = data.currentConditions.conditions.toUpperCase();
  locationName.textContent = `${city}${country}`.toUpperCase();
  temperature.textContent = `${tempData} °C`;
  feelsLike.textContent = `FEELS LIKE: ${feelsLikeData} °C`;
  humidity.textContent = `HUMIDITY: ${data.currentConditions.humidity}%`;
  wind.textContent = `WIND: ${data.currentConditions.windspeed} km/h`;
};

const getFormData = function getFormData(target) {
  const form = new FormData(target);
  const data = Object.fromEntries(form);
  return data;
};

const getLocationWeather = async function getLocationWeather(location) {
  try {
    const request = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=74UJFHRYWB4AU3J34EKZQSS84`,
      {
        mode: 'cors',
      },
    );
    const weatherData = await request.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

const formHandler = async function formHandler(e) {
  e.preventDefault();
  const response = getFormData(e.target);
  const data = await getLocationWeather(response.location);
  displayData(data);
  e.target.reset();
};

document.addEventListener('submit', formHandler);

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getLocationWeather('Manila');
  displayData(data);
});
