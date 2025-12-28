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