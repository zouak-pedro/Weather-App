const apiKey = "24a83226bea88ea935fbce437b78b6eb";
let cityName = "annaba";
let apiData = {};
apiData.name = "";

function checkweather(city) {
  if (!city || typeof city !== "string" || city.trim() === "") {
    console.error("Invalid city name. Please provide a valid city name.");
    document.querySelector(".city_error").style.opacity = 1;
  } else if (apiData.name === city) {
    console.error("You have already searched.");
  } else {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        apiData = data;
        console.log(data);
        document.querySelector(".city_error").style.opacity = 0;
        updatePage(apiData);
      })
      .catch((error) => {
        console.error("Problem with fetch operation", error);
        document.querySelector(".city_error").style.opacity = 1;
      });
  }
}

// checkweather(cityName);

document.querySelector(".search_bar_search").addEventListener("click", () => {
  cityName = document.querySelector(".search_bar").value;
  checkweather(cityName);
});

document.addEventListener("keydown", function (event) {
  let keyCode = event.keyCode;
  if (keyCode === 13) {
    cityName = document.querySelector(".search_bar").value;
    checkweather(cityName);
  }
});

function updatePage(data) {
  document.querySelector(".search_location_info_name").innerHTML = apiData.name;
  document.querySelector(".search_location_info_fullname").innerHTML =
    apiData.name + ", " + apiData.sys.country;
  document.querySelector(".main_temp_data").innerHTML = Math.round(
    apiData.main.temp
  );
  document.querySelector(".detail_weather_state").innerHTML =
    apiData.weather[0].description;
  document.querySelector(".detail_weather_humidity").innerHTML =
    apiData.main.humidity;
  document.querySelector(
    ".main_dayimg"
  ).style.backgroundImage = `url(https://openweathermap.org/img/wn/${apiData.weather[0].icon}@4x.png)`;

  document.querySelector(".detail_weather_wind").innerHTML = Math.round(
    apiData.wind.speed
  );
}
