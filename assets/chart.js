import {
    celsiusToFahrenheit
}from './utils.js';

const tempChartEl = document.getElementById('tempChart');
let tempChart = null;


export const prepareChartData = (forecastData, unit) => {
    const nextHours = forecastData.list.slice(0, 8);

    const labels = nextHours.map(item => {
        const fullTime = item.dt_txt.split(' ')[1];

        return `${fullTime.slice(0, 2)}h`;
    });

    const temperatures = nextHours.map(item => {
        let temperature = item.main.temp;

        if(unit === 'fahrenheit'){
            temperature = celsiusToFahrenheit(temperature);
        }

        return Math.round(temperature);
    });

    return { labels, temperatures };  
};