const apiKey = "24a83226bea88ea935fbce437b78b6eb";
let cityName = "annaba";
let apiData;
function checkweather(city) {
  if (!city || typeof city !== "string" || city.trim() === "") {
    console.error("Invalid city name. Please provide a valid city name.");
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
      })
      .catch((error) => {
        console.error("Problem with fetch operation", error);
      });
  }
}

// let apiData = checkweather(cityName);
