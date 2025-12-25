import { 
    formatDate, 
    formatWindSpeed, 
    getWeekdayShort, 
    getWeatherIconUrl, 
    translateWeatherDescription 
} from './utils.js';

const cityNameEl = document.getElementById('city-name');
const currentDateEl = document.getElementById('current-date');
const tempMainEl = document.getElementById('temp-main');
const weatherDescEl = document.getElementById('weather-desc');
const weatherIconLargeEl = document.getElementById('weather-icon-large');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const pressureEl = document.getElementById('pressure');
const feelsLikeEl = document.getElementById('feels-like');
const forecastContainerEl = document.getElementById('forecast-container');


export const updateMainWeather = (data) => {
    cityNameEl.textContent = data.name;
    currentDateEl.textContent = formatDate(new Date());
    tempMainEl.textContent = `${Math.round(data.main.temp)}°`;
    weatherDescEl.textContent = translateWeatherDescription(data.weather[0].description);

    const iconUrl = getWeatherIconUrl(data.weather[0].icon, '4x');
    weatherIconLargeEl.innerHTML = `<img src="${iconUrl}" alt="Clima" class="w-full">`;
};

