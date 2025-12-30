// =========================================================================
// API MODULE FOR WEATHER DATA FETCHING
// =========================================================================
const API_KEY = 'c1225f59555dbbcdef944599b28b209a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const UNITS = 'metric';
const LANG = 'pt_br'; 


// Constructs a full URL with query parameters for the OpenWeather API
export const buildUrl = (endpoint, params) => {
    const searchParams = {
        ... params,
        appid: API_KEY,
        units: UNITS,
        lang: LANG 
    };

    const queryString = new URLSearchParams(searchParams).toString();
    return `${BASE_URL}/${endpoint}?${queryString}`
};


// Fetches current weather data for a specific city
export const getCurrentWeather = async (city) => {
    try {
        const url = buildUrl('weather', {q: city});
        const response = await fetch(url);

        if(!response.ok){
            throw new Error('Cidade não encontrada');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error ao buscar clima:', error.message);
        return null;
    }
};


// Fetches 5-day forecast data for a specific city
export const getForecast = async (city) => {
    try {
        const url = buildUrl('forecast', {q: city});
        const response = await fetch(url);

        if(!response.ok){
            throw new Error('Cidade não encontrada');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error ao buscar previsão:', error.message);
        return null;
    }
};


// Fetches weather data using geographic coordinates (latitude and longitude)
export const getWeatherByCoords = async (lat, lon) => {
    try {
        const url = buildUrl('weather', {lat, lon});
        const response = await fetch(url);

        if(!response.ok){
            throw new Error('Coordenadas inválidas');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error ao buscar clima por coordenadas:', error.message);
        return null;
    }
};


// Filters raw forecast data to return only noon reports for the next 5 days
export const processForecastData = (forecastData) => {
    if(!forecastData || !forecastData.list) return [];

    const dailyData = forecastData.list.filter(item => {
        return item.dt_txt.includes('12:00:00');
    });

    return dailyData.slice(0, 5);
};