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



export const createTempChart = (chartData, unit) => {

    if(tempChart) tempChart.destroy();

    const data = prepareChartData(chartData, unit);

    tempChart = new Chart(tempChartEl, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Temperatura',
                data: data.temperatures,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    ticks: { color: 'rgb(148, 163, 184)' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: {
                    ticks: { color: 'rgb(148, 163, 184)' },
                    grid: { display: false }
                }
            }
        }
    });
};