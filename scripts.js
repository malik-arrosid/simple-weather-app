document
  .getElementById("weather-form")
  .addEventListener("submit", fetchWeather);

async function fetchWeather(event) {
  event.preventDefault();
  const city = document.getElementById("city-input").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  const cityName = document.getElementById("city-name");
  const weatherIcon = document.getElementById("weather-icon");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");

  cityName.textContent = data.name;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  weatherIcon.alt = data.weather[0].description;
  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  description.textContent = `Description: ${data.weather[0].description}`;

  document.getElementById("weather-result").style.display = "block";
}
