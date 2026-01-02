// =========================================================================
// MAIN JAVASRIPT MODULE FOR WEATHER APPLICATION
// =========================================================================

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


import {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
} from './utils.js';

import { createTempChart } from './chart.js';


let currentCity = null;
let currentTemp = null;
let currentUnit = 'celsius';
let currentfeelslike = null;
let lastForecastData = null;

const cityInputEl = document.getElementById('city-input');
const geoBtnEl = document.getElementById('geo-btn');
const favoritebtnEl = document.getElementById('favorite-btn');
const celsiusBtnEl = document.getElementById('celsius-btn');
const fahrenheitBtnEl = document.getElementById('fahrenheit-btn');
const tempMainEl = document.getElementById('temp-main');
const feelslikeEl = document.getElementById('feels-like');
const favoriteIconEl = document.getElementById('favorite-icon');


// loads weather data for a specified city and updates the UI accordingly
const loadWeatherData = async (city) => {
    try{
        const weatherData = await getCurrentWeather(city);

        if(!weatherData){
            showError('Cidade não encontrada');
            return;
        }

        const forecastData = await getForecast(city);
        lastForecastData = forecastData;
        const processedForecast = processForecastData(forecastData);

        updateMainWeather(weatherData);
        updateWeatherMetrics(weatherData);
        updateForecast(processedForecast);
        createTempChart(forecastData, currentUnit);

        currentCity = weatherData.name;
        currentTemp = weatherData.main.temp;
        currentfeelslike = weatherData.main.feels_like;

        updateFavoriteIcon();
        updateTemperatureDisplay();

    }catch(error){
        console.error(error);
        showError('Erro ao carregar dados meteorológicos');
    }
}; 


// loads weather data based on the user's current geographic location
const loadWeatherByLocation = () => {

        if(!navigator.geolocation){
            showError('Geolocalização não suportada pelo navegador');
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
        try{
            const {latitude, longitude} = position.coords;
            const weatherData = await getWeatherByCoords(latitude, longitude);

            const forecastData = await getForecast(weatherData.name);
            const processedForecast = processForecastData(forecastData);
            updateForecast(processedForecast);

            updateMainWeather(weatherData);
            updateWeatherMetrics(weatherData);

            currentCity = weatherData.name;
            currentTemp = weatherData.main.temp;
            currentfeelslike = weatherData.main.feels_like;
            
            updateFavoriteIcon();
            updateTemperatureDisplay();

        }catch(error){
            showError('Erro ao obter dados meteorológicos pela localização');
        } 
        }, (error) => {
            showError('Permissão de localização negada ou sinal indisponível');
        });   
}; 


// renders the list of favorite cities in the UI
const renderFavorites = () => {
    const favorites = getFavorites();

    updateFavoritesList(favorites, (city) => {
        loadWeatherData(city);
    });
};


// handles user input and loads weather data for the specified city
cityInputEl.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
    const city = cityInputEl.value.trim();

    if(city === ''){
        showError('Por favor, insira o nome de uma cidade');
    }

       if(city !== ''){
        loadWeatherData(city);
        cityInputEl.value = '';
       }
    }
});


// handles geolocation button click to load weather data based on user's location
geoBtnEl.addEventListener('click', () => {
    loadWeatherByLocation();
});


// toggles the favorite status of the current city
const toggleFavorite = () => {
    if(!currentCity) return;

    if(isFavorite(currentCity)){
        removeFavorite(currentCity);
    }else{
        addFavorite({city: currentCity, temp: currentTemp});
    }

    renderFavorites();
};


// updates the favorite icon based on the current favorite status
const updateFavoriteIcon = () => {
    if(!currentCity) return;

    if(isFavorite(currentCity)){
        favoriteIconEl.classList.remove('text-slate-400');
        favoriteIconEl.classList.add('text-yellow-400');
        favoritebtnEl.title = 'Remover dos favoritos';
    }else{
        favoriteIconEl.classList.remove('text-yellow-400');
        favoriteIconEl.classList.add('text-slate-400');
        favoritebtnEl.title = 'Adicionar aos favoritos';
    }
}

favoritebtnEl.addEventListener('click', () => {
    toggleFavorite();
    updateFavoriteIcon();
});


// initializes the application by loading default weather data and rendering favorites
const init = () => {
    loadWeatherData('São Paulo');
    renderFavorites();
};

document.addEventListener('DOMContentLoaded', init);


// converts temperature between Celsius and fahrenheit based on the selected unit
const convertTemperature = (temp, unit) => {

    if(unit === 'fahrenheit'){
        return celsiusToFahrenheit(temp);
    }

    return temp;
};


// updates the temperature display based on the selected unit
const updateTemperatureDisplay = () => {
    if(currentTemp === null) return;

    const convertedTemp = convertTemperature(currentTemp, currentUnit);
    tempMainEl.textContent = `${Math.round(convertedTemp)}°`;

    if(currentfeelslike !== null){
        const convertedFeels = convertTemperature(currentfeelslike, currentUnit);
        feelslikeEl.textContent = `${Math.round(convertedFeels)}°`;  
    }
};


// toggles between Celsius and Fahrenheit units
const toggleUnit = (unit) => {
    if(unit === currentUnit) return;

    currentUnit = unit;

    if(unit === 'celsius'){
        celsiusBtnEl.className = 'px-4 py-1 bg-blue-500 rounded-md text-sm font-bold transition';
        fahrenheitBtnEl.className = 'px-4 py-1 text-slate-400 text-sm hover:text-white transition';
    }else{
        celsiusBtnEl.className = 'px-4 py-1 text-slate-400 text-sm hover:text-white transition';
        fahrenheitBtnEl.className = 'px-4 py-1 bg-blue-500 rounded-md text-sm font-bold transition';
    }

    updateTemperatureDisplay();

    if(lastForecastData){
        createTempChart(lastForecastData, currentUnit);
    }
};

celsiusBtnEl.addEventListener('click', () => toggleUnit('celsius'));
fahrenheitBtnEl.addEventListener('click', () => toggleUnit('fahrenheit'));