import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";

function App() {
  const [coords, setcoords] = useState();
  const [weather, setweather] = useState();
  const [temp, settemp] = useState()



  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setcoords(obj);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
      if (coords) {
        const url=` https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${import.meta.env.VITE_API_KEY}`
        axios.get(url)
        .then(res=>{
          setweather(res.data)
          const objTem={
            celsius:+(res.data.main.temp-273.15).toFixed(1),
            farenheit:+((res.data.main.temp-273.15)*9/5 +32).toFixed(1)
          }
          settemp(objTem)
        } )
        .catch(err => console.log(err))
      }
       
  }, [coords])

  console.log(weather);
  
  
  return (
    <div className="app">
      {
        weather?
        <WeatherCard 
        weather={weather} 
        temp={temp}
        />
        :
        <Loading />
      }
    </div>
  );
}

export default App;
