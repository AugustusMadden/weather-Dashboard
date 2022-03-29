var city = $("#city-input");
var cityFormEl = $('#city-form');
var cityListEl = $('#city-list');

var currentDay = moment().format("MMM Do, YYYY");
var day1El = document.querySelector("#day1");
var day2El = document.querySelector("#day2");
var day3El = document.querySelector("#day3");
var day4El = document.querySelector("#day4");
var day5El = document.querySelector("#day5");

var citySearchTerm = document.querySelector('#city-search-term');

var dayTemp = document.querySelectorAll(".dayTemp");
var dayTempArray = Array.from(dayTemp);
var wind = document.querySelectorAll(".wind");
var windArray = Array.from(wind);
var humidity = document.querySelectorAll(".humidity");
var humidityArray = Array.from(humidity);


function handleFormSubmit(event) {
    event.preventDefault();

    var cityItem = city.val().trim();


    if (!cityItem) {
        console.log('Please enter a valid city name.');
        return;
    } else {
        accessWeatherApi(cityItem);
    }

}

var accessWeatherApi = function (city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9a0c1f4f5e6b2019f49adc024a5cd111&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
}

var displayWeather = function (data, city) {
    citySearchTerm.textContent = city + " " + currentDay;

    var currentTemp = document.querySelector("#currentTemp");
    var currentWind = document.querySelector("#currentWind");
    var currentHumidity = document.querySelector("#currentHumidity");
    var currentUvIndexEl = document.querySelector("#currentUvIndex");

    currentTemp.textContent = `Temperature: ${data.main.temp} \u00B0F`;
    currentWind.textContent = `Wind: ${data.wind.speed} MPH`;
    currentHumidity.textContent = `Humidity: ${data.main.humidity} %`;

    var latVal = data.coord.lat;
    var lonVal = data.coord.lon;


    var queryURL2 = "http://api.openweathermap.org/data/2.5/onecall?lat=" + latVal + "&lon=" + lonVal + "&appid=9a0c1f4f5e6b2019f49adc024a5cd111&units=imperial";


    ;

    fetch(queryURL2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentUvIndexEl.textContent = ` UV: ${data.current.uvi}`;
            if (data.current.uvi <= 2) {
                currentUvIndexEl.classList.add("uv-low");
            } else if (data.current.uvi > 2 && data.current.uvi <= 5) {
                currentUvIndexEl.classList.add("uv-moderate");
            } else if (data.current.uvi > 5 && data.current.uvi <= 8) {
                currentUvIndexEl.classList.add("uv-high");
            } else if (data.current.uvi > 8) {
                currentUvIndexEl.classList.add("uv-veryHigh");
            }

            day1El.textContent = moment().add(1, "d").format("MMM Do, YYYY");
            day2El.textContent = moment().add(2, "d").format("MMM Do, YYYY");
            day3El.textContent = moment().add(3, "d").format("MMM Do, YYYY");
            day4El.textContent = moment().add(4, "d").format("MMM Do, YYYY");
            day5El.textContent = moment().add(5, "d").format("MMM Do, YYYY");

            for (var i = 0; i < data.daily.length - 3; i++) {
                var day = data.daily[i+1];
                
                dayTempArray[i].textContent = `Temp: ${day.temp.day} \u00B0F`;
                windArray[i].textContent = `Wind: ${day.wind_speed} MPH`;
                humidityArray[i].textContent = `Humidity: ${day.humidity} %`;
            }
  
        })
}
cityFormEl.on('submit', handleFormSubmit);