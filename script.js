document.addEventListener('DOMContentLoaded', (event) => {
    var inputvalue = document.querySelector('#cityinput');
    var btn = document.querySelector('#add');
    var apik = "a931a5af6855b33cbbdca3bdd5ab9f04";

    function conversion(val) {
        return (val - 273.15).toFixed(2); // Convert Kelvin to Celsius and fix to 2 decimal places
    }

    btn.addEventListener('click', function() {
        var cityValue = inputvalue.value.trim();
        if (cityValue === "") {
            alert("Please enter a city name.");
            return;
        }

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityValue + '&appid=' + apik)
        .then(response => {
            if (!response.ok) {
                console.error('Network response was not ok:', response.statusText);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod !== 200) {
                console.error('Error from API:', data.message);
                throw new Error(data.message);
            }

            var weatherData = {
                name: data.name,
                description: data.weather[0].description,
                temperature: conversion(data.main.temp),
                windspeed: data.wind.speed
            };

            // Pass data to the new window using local storage
            localStorage.setItem('weatherData', JSON.stringify(weatherData));

            // Open the display.html page in a new window
            window.open('display.html', '_blank');
        })
        .catch(err => {
            console.error('Fetch error:', err);
            alert('You entered an incorrect city name or there was an issue with the API.');
        });
    });
});
