import {
    getCurrentWeather,
    getForecast,
    getWeatherByCoords,
    processForecastData,
} from './api.js';


import {
    updateMainWeather,
    updateWeatherMetrics,
    updateForecast,
    updateFavoritesList,
    showError,
} from './ui.js';


import {
    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
} from './storage.js';


let currentCity = null;
let currentTemp = null;
let currentUnit = 'celsius';

const cityInputEl = document.getElementById('city-input');
const geoBtnEl = document.getElementById('geo-btn');



const loadWeatherData = async (city) => {
    try{
        const weatherData = await getCurrentWeather(city);

        if(!weatherData){
            showError('Cidade não encontrada');
            return;
        }

        const forecastData = await getForecast(city);
        const processedForecast = processForecastData(forecastData);

        updateMainWeather(weatherData);
        updateWeatherMetrics(weatherData);
        updateForecast(processedForecast);

        currentCity = weatherData.name;
        currentTemp = weatherData.main.temp;

    }catch(error){
        showError('Erro ao carregar dados meteorológicos');
    }
}; 