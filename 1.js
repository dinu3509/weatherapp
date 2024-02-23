const jsonFileURL = 'city.list.json';
const inputBox = document.getElementById("input-box");
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");
const resultsBox = document.querySelector(".result-box ul");
const weather = document.querySelector(".weather");

fetch(jsonFileURL)
  .then(response => response.json())
  .then(data => {
    const cityNames = data.map(city => city.name);

    inputBox.onkeyup = function(){
        let result = [];
        let input = inputBox.value;

        if(input.length){
            result = cityNames.filter((keyword)=>{
                return keyword.toLowerCase().includes(input.toLowerCase());
            }).slice(0, 5); // Get only the top 5 items

            display(result);
            resultsBox.style.display = 'block'; // Show the results box
        } else {
            resultsBox.innerHTML = ''; // Clear the results box if input is empty
            resultsBox.style.display = 'none'; // Hide the results box
        }
    }

    function display(result){
        const content = result.map((list)=>{
            return "<li>"+ list + "</li>";
        });
        resultsBox.innerHTML = "<ul>"+content.join("")+"</ul>"; // Join content array before setting innerHTML

        // Add click event listener to each result box item
        resultsBox.querySelectorAll("li").forEach(item => {
            item.addEventListener("click", () => {
                console.log(item.textContent);
                inputBox.value = item.textContent; // Set the value of searchBox to clicked item
                resultsBox.style.display = 'none'; // Hide the results box
                checkWeather(searchBox.value);
                weather.style.display='block';
                resultsBox.style.borderTop='1px solid black';
                resultsBox.style.padding='15px 10px;';

            });
        });
    }
  })
  .catch(error => console.error('Error fetching JSON:', error));

const apiKey = "12edbc4b1078fa0c857ebdda88fed362";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

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
    resultsBox.style.display = 'none';
});
