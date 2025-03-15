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

  locationName.textContent = data.address;
  temperature.textContent = `Temperature: ${data.currentConditions.temp}°C`;
  feelsLike.textContent = `Feels like: ${data.currentConditions.feelslike}°C`;
  humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;
  wind.textContent = `Wind: ${data.currentConditions.windspeed} km/h`;
}

async function getLocationWeather(data) {
  const location = data.location;

  try {
    const request = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=74UJFHRYWB4AU3J34EKZQSS84`,
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
