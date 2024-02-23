const apiKey = "12edbc4b1078fa0c857ebdda88fed362";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
async function checkWeather(city) {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector(".humidity").innerHTML = data.main.humidity + '%';

    let windSpeedValue = data.wind.speed;
    let numericWindSpeed = parseInt(windSpeedValue, 10);
    numericWindSpeed = numericWindSpeed * (18 / 5);
    windSpeedValue = numericWindSpeed.toString();

    document.querySelector(".wind").innerHTML = windSpeedValue + 'km/h';

    if(data.weather[0].main=="Clouds"){
        weatherIcon.src  ="images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src  ="images/clear.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src  ="images/rain.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src  ="images/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src  ="images/mist.png"
    }
}

searchBtn.addEventListener("click", () => {
    
    checkWeather(searchBox.value);
});
fetch(jsonFileURL)
.then(response => response.json())
.then(data => {
const cityNames = data.map(city => city.name);
})
.catch(error => console.error('Error fetching JSON:', error));
