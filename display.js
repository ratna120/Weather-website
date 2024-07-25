document.addEventListener('DOMContentLoaded', (event) => {
    var city = document.querySelector('#cityouput');
    var descrip = document.querySelector('#description');
    var temp = document.querySelector('#temp');
    var wind = document.querySelector('#wind');
    var weatherChart;

    // Retrieve weather data from local storage
    var weatherData = JSON.parse(localStorage.getItem('weatherData'));

    if (weatherData) {
        city.innerHTML = `Weather of <span>${weatherData.name}</span>`;
        temp.innerHTML = `Temperature: <span>${weatherData.temperature}&deg;C</span>`;
        wind.innerHTML = `Wind Speed: <span>${weatherData.windspeed} m/s</span>`;
        descrip.innerHTML = `Sky Conditions: <span>${weatherData.description}</span>`;

        // Create the chart with the weather data
        createChart([weatherData.temperature, weatherData.windspeed]); // Pass the data to the chart creation function
    } else {
        console.error('No weather data found.');
    }

    function createChart(data) {
        var ctx = document.getElementById('weatherChart').getContext('2d');
        if (weatherChart) {
            weatherChart.destroy(); // Destroy the existing chart instance if it exists
        }
        weatherChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Temperature', 'Wind Speed'], // Add more labels as needed
                datasets: [{
                    label: 'Weather Data',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
