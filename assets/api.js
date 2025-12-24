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