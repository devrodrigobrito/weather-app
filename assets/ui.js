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


export const updateWeatherMetrics = (data) => {
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = formatWindSpeed(data.wind.speed);
    pressureEl.textContent = `${data.main.pressure} hPa`;
    feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°`;
};



export const updateForecast = (forecastList) => {
    let html = '';

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const weekday = getWeekdayShort(date);
        const iconUrl = getWeatherIconUrl(forecast.weather[0].icon, '2x');
        const tempMax = `${Math.round(forecast.main.temp_max)}°`;
        const tempMin = `${Math.round(forecast.main.temp_min)}°`; 

    html += `<div class="flex items-center justify-between">
    <span class="w-10 text-sm">${weekday}</span>
    <img src="${iconUrl}" class="w-8" />
    <span class="font-semibold text-white">${tempMax}</span>
    <span class="text-slate-500 text-sm">${tempMin}</span>
   </div>`
    });

    forecastContainerEl.innerHTML = html;
};




