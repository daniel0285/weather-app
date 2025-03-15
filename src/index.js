import './styles.scss';

document.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = getFormData(e.target);
  const data = await getLocationWeather(location);
  displayData(data);

  e.target.reset();
});

function getFormData(target) {
  const form = new FormData(target);
  const data = Object.fromEntries(form);
  return data;
}

function displayData(data) {
  const locationName = document.getElementById('locationName');
  const temperature = document.getElementById('temperature');
  const feelsLike = document.getElementById('feelsLike');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');

  const tempData = convertToCelcius(data.currentConditions.temp);
  const feelsLikeData = convertToCelcius(data.currentConditions.feelslike);

  locationName.textContent = data.address;
  temperature.textContent = `Temperature: ${tempData}°C`;
  feelsLike.textContent = `Feels like: ${feelsLikeData}°C`;
  humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;
  wind.textContent = `Wind: ${data.currentConditions.windspeed} km/h`;
}

function convertToCelcius(fahrenheit) {
  const celcius = (fahrenheit - 32) * (5 / 9);
  return celcius.toFixed(2);
}

function convertToFahrenheit(celcius) {
  const fahrenheit = celcius * (9 / 5) + 32;
  return fahrenheit.toFixed(2);
}

async function getLocationWeather(data) {
  const location = data.location;

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
}

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// const day = new Date('2025-03-19').getDay();
// console.log(days[day - 1]);
// test
