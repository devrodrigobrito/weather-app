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

        }catch(error){
            showError('Erro ao obter dados meteorológicos pela localização');
        } 
        }, (error) => {
            showError('Permissão de localização negada ou sinal indisponível');
        });   
}; 



const renderFavorites = () => {
    const favorites = getFavorites();

    updateFavoritesList(favorites, (city) => {
        loadWeatherData(city);
    });
};


cityInputEl.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
    const city = cityInputEl.value.trim();

       if(city !== ''){
        loadWeatherData(city);
        cityInputEl.value = '';
       }
    }
});


geoBtnEl.addEventListener('click', () => {
    loadWeatherByLocation();
});