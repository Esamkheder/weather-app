const search_but =  document.getElementById("search-btn")
const input_search = document.getElementById("input-search")
const error_mes = document.getElementById("error-message")
const apiKey = "?key=AB7G6HHFFYMBEYF65VRVG8LK4&include&units=metric"
const apiURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".icon")

search_but.addEventListener("click", () => {
    if (input_search.value.trim() === "") {
        error_mes.textContent = "Please enter a city name";
    }else {
        error_mes.textContent= "";
    }
});

async function  checkWeather (city){
    const response = await fetch(apiURL + city + apiKey)
    let data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML =  data.address
    document.querySelector(".temp").innerHTML =  ((data.currentConditions.temp - 32) * 5/9 ).toFixed(1) + "°C" 
    document.querySelector(".details").innerHTML =  data.currentConditions.conditions
    if(data.currentConditions.icon == "clear-day"){
        weatherIcon.src = "images/clear.png"
    }else if (data.currentConditions.icon == "clear-night"){
        weatherIcon.src = "images/night-moon.png"
    }else if (data.currentConditions.icon == "partly-cloudy-day"){
        weatherIcon.src = "images/clouds.png"
    }else if (data.currentConditions.icon == "partly-cloudy-night"){
        weatherIcon.src = "images/crescent-moon.png"
    }else if (data.currentConditions.icon == "cloudy"){
        weatherIcon.src = "images/cloudy.png"
    }else if (data.currentConditions.icon == "rain"){
        weatherIcon.src = "images/rain.png"
    }else if (data.currentConditions.icon == "snow"){
        weatherIcon.src = "images/snow.png"
    }else if (data.currentConditions.icon == "fog"){
        weatherIcon.src = "images/cloudy (1).png"
    }else if (data.currentConditions.icon == "wind"){
        weatherIcon.src = "images/wind.png"
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})






