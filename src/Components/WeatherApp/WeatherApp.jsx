import React, { useState } from "react";
import "./Weather.css";

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const weatherAPI = "0991615d6d665a9fc763b954c4124bf8";
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (!element[0].value) {
      return 0;
    }
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${weatherAPI}`;

    try {
      const response = await fetch(weatherURL);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setWeatherData(data);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="weather-image">
        <img
          src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
          alt="img"
        />
      </div>

      {weatherData && (
        <>
          <div className="weather-main">
          <div className="weather-temp">{Math.round(weatherData.main.temp)} °C</div>
          <div className="weather-location">{weatherData.name}</div>
          </div>
          <div className="data-container">
            <div className="element">
              <i className="fa-solid fa-droplet"></i>
              <div className="data">
                <div className="humidity-percentage">{weatherData.main.humidity}</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <i className="fa-solid fa-wind"></i>
              <div className="data">
                <div className="humidity-percentage">{weatherData.wind.speed}</div>
                <div className="text">Wind speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
