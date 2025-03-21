// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";


// function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchWeather = async () => {
//     if (!city) {
//       setError("Please enter a city name.");
//       return;
//     }

//     setLoading(true);
//     setError(""); // Clear previous errors
//     setWeather(null);

//     try {
//       const response = await axios.get(`http://localhost:8080/weather?city=${city}`, {
//         headers: { "Access-Control-Allow-Origin": "*" }, // Handle CORS
//       });

//       setWeather(response.data);
//     } catch (err) {
//       setError("Could not fetch weather data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Weather App</h2>
//       <input
//         type="text"
//         placeholder="Enter city name"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//       <button onClick={fetchWeather} disabled={loading}>
//         {loading ? "Loading..." : "Get Weather"}
//       </button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {weather && (
//         <div>
//           <h3>{weather.name}</h3>
//           <p>Temperature: {weather.main.temp}°C</p>
//           <p>Weather: {weather.weather[0].description}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://yourapp.onrender.com/weather?city=${city}`
      );
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

