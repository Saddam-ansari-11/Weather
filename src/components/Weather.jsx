import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import { FaSearch } from "react-icons/fa";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const inputref = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03n": cloud_icon,
    "03d": cloud_icon,
    "04n": drizzle_icon,
    "04d": drizzle_icon,
    "09n": rain_icon,
    "09d": rain_icon,
    "10n": rain_icon,
    "10d": rain_icon,
    "13n": snow_icon,
    "13d": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter City name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        windspeed: data.wind.speed,
        icon: icon,
        loaction: data.name,
      });
    } catch (error) {
      setWeatherData(false);
      console.log(error);
    }
  };
  useEffect(() => {
    search("kushinagar");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputref} />
        <FaSearch
          className="w-[50px] h-[50px] p-[14px] bg-white rounded-full cursor-pointer"
          onClick={() => search(inputref.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temp}°C</p>
          <p className="location">{weatherData.loaction}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windspeed} Km/H</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
