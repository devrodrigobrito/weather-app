const API_KEY = 'MINHA_API_KEY_AQUI';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const UNITS = 'metric';
const LANG = 'pt_br'; 

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