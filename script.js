async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");
  const apiKey = "8aeda79261e0df9cde7692d4f2faa27f"; // 🔑 Replace with your OpenWeatherMap API Key

  if (!city) {
    result.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  result.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      result.innerHTML = `<p>City not found. Please try again.</p>`;
    } else {
      result.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: <strong>${data.main.temp}°C</strong></p>
        <p>🌥️ Weather: <strong>${data.weather[0].description}</strong></p>
        <p>💧 Humidity: <strong>${data.main.humidity}%</strong></p>
        <p>🌬️ Wind: <strong>${data.wind.speed} m/s</strong></p>
      `;
    }
  } catch (error) {
    result.innerHTML = "<p>Failed to fetch weather data. Please try later.</p>";
  }
}
