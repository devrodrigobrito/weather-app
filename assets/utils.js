// =========================================================================
// ULTILITIES FOR FORMATTING AND CONVERSION CLIMATIC DATA
// =========================================================================

// Format current data
export const formatDate = (date) => {
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    
    //Formats and capitalizes only the first letter of the string.
    return capitalize(formatter.format(date));
};

// Converts Celsius to Fahrenheit with 1 decimal place accuracy.
export const celsiusToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9/5) + 32;

    return parseFloat(fahrenheit.toFixed(1));
};

// Converts Fahrenheit to Celsius with 1 decimal place accuracy.
export const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = (fahrenheit - 32) * 5/9;

    return parseFloat(celsius.toFixed(1));
};

// Converts m/s to km/h and formats for display.
export const formatWindSpeed = (speed) => {
    const kmh = Math.round(speed * 3.6);

    return `${kmh} km/h`;
};

// Get weekday short for forecast display
export const getWeekdayShort = (date) => {
    const options = {weekday: 'short'};
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    
    return formatter.format(date).slice(0, 3).toLowerCase();
};

// Get the weather forecast icon URL generator utility
export const getWeatherIconUrl = (iconCode, size = '2x') => {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`
};

// standardize the dashboard text
export const capitalize = (text) => {
    if(!text) return '';
    const lowercase = text.toLowerCase();

    return lowercase.replace(/^\w/, (c) => c.toUpperCase());
};

// Weather description translation utility
const weatherTranslations = {
    "clear sky": "Céu limpo", 
    "few clouds": "Poucas nuvens",
    "scattered clouds": "Nuvens dispersas",
    "broken clouds": "Nublado",
    "overcast clouds": "Encoberto",
    "light rain": "Chuva leve", 
    "moderate rain": "Chuva moderada",
    "heavy rain": "Chuva forte", 
    "thunderstorm": "Tempestade"
 };

export const translateWeatherDescription = (description) => {
    const translation = weatherTranslations[description.toLowerCase()];

    return translation || capitalize(description);
};
