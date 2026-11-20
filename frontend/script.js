
const search_but = document.getElementById("search-btn");
const input_search = document.getElementById("input-search");
const error_mes = document.getElementById("error-message");
const weatherIcon = document.querySelector(".icon");

// Search Button
search_but.addEventListener("click", () => {

    const city = input_search.value.trim();

    if (city === "") {
        error_mes.textContent = "Please enter a city name";
        return;
    }

    error_mes.textContent = "";

    checkWeather(city);
});

// Get Weather Data From Backend
async function checkWeather(city) {

    try {

        const url = `http://0.0.0.0:3001/weather?city=${encodeURIComponent(city)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Weather request failed");
        }

        console.log(data);

        // Display Weather Information
        document.querySelector(".city").textContent = data.city;

        document.querySelector(".temp").textContent =
            data.temperature + "°C";

        document.querySelector(".details").textContent =
            data.conditions;

        // Weather Icons
        if (data.conditions == "clear-day") {
            weatherIcon.src = "images/clear.png";

        } else if (data.conditions == "clear-night") {
            weatherIcon.src = "images/night-moon.png";

        } else if (data.conditions == "partly-cloudy-day") {
            weatherIcon.src = "images/clouds.png";

        } else if (data.conditions == "partly-cloudy-night") {
            weatherIcon.src = "images/crescent-moon.png";

        } else if (data.conditions == "cloudy") {
            weatherIcon.src = "images/cloudy.png";

        } else if (data.conditions   == "rain") {
            weatherIcon.src = "images/rain.png";

        } else if (data.conditions == "snow") {
            weatherIcon.src = "images/snow.png";

        } else if (data.conditions == "fog") {
            weatherIcon.src = "images/cloudy (1).png";

        } else if (data.conditions == "wind") {
            weatherIcon.src = "images/wind.png";
        }

    } catch (error) {

        error_mes.textContent = error.message;
        console.error(error);

    }
}
