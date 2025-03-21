import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Backend URL from .env file
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://weather-app-backend-38ue.onrender.com";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/weather?city=${city}`);
      setWeather(response.data);
      setError(""); // Clear previous errors
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className="weather-card">
          <h3>{weather.name}</h3>
          <div className="image">
            <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="Weather Logo" width="100" />
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
            alt="Weather Icon"
            className="weather-icon"
            onError={(e) => {
              console.log("Image failed to load:", e.target.src);
              e.target.src = "fallback-image.png"; // Optional fallback
            }}
          />
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
