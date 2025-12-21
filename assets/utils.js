// =========================================================================
// ULTILITIES FOR FORMATTING AND CONVERSION CLIMATIC DATA
// =========================================================================

// Format current data
export const formatDate = (date) => {
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    
    //Formats and capitalizes only the first letter of the string.
    return formatter.format(date).replace(/^\w/, (c) => c.toUpperCase());
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
