/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useState } from "react";
import "./styles/weatherCard.css"

const WeatherCard = ({ weather,temp,setcity }) => {
  const [isCelsius, setisCelsius] = useState(true)
  
  const handleChangeTemp=()=>{
    setisCelsius(!isCelsius)
  }
  const handleSearch=(e)=>{
    e.preventDefault();
    setcity(e.target.inputValue.value.trim());
    e.target.inputValue.value = "";
  }
    
  console.log(weather);
  return (
    <article className="weather">
      <header className="weatherHeader">
        <h1 className="weatherTitle">Weather App</h1>
        <h2 className="weatherSubtitle">
          {weather?.name}, {weather?.sys.country}
        </h2>
      </header>
      <section className="weatherBody">
        <div className="weatherImgContainer">
          <img
            src={
              weather
                ? `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
                : ""
            }
            alt="iconWeather"
          />
        </div>
        <div className="weatherInfo">
          <h3 className="weatherInfoTitle">"{weather?.weather[0].description}"</h3>
          <ul className="weatherList">
            <li className="weatherListItem ">
              <span className="weatherListLabel">Wind Speed</span>{" "}
              <span className="weatherListValue">{weather?.wind.speed} meter/sec</span>
            </li>
            <li className="weatherListItem">
              <span className="weatherListLabel">Clouds</span> <span className="weatherListValue">{weather?.clouds.all} %</span>
            </li>
            <li className="weatherListItem">
              <span className="weatherListLabel">Pressure</span> <span className="weatherListValue">{weather?.main.pressure} hPa</span>
            </li>
          </ul>
        </div>
      </section>
      <aside>
        <h2 className="weatherTemp">{isCelsius ? `${temp?.celsius} °C`: `${temp.farenheit} °F`}</h2>
        <button onClick={handleChangeTemp} className="weatherBtn">Change to {isCelsius?"°F":"°C"}</button>
        <form onSubmit={handleSearch} className="formWether">
          <input type="text" id="inputValue" />
          <button>Search</button>
        </form>
      </aside>

    </article>
  );
};

export default WeatherCard;
