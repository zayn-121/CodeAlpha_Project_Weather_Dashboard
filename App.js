import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import DisplayComponent from "./src/DisplyComponent";

const api = {
  Key: "3862ecd80f473013250be9b912772918",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // tracking the input field
  const changeRegion = (value) => {
    setLocation(value);
    // console.log(value);
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords.latitude, position.coords.longitude);

            // Api call to get weather data
            fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=3862ecd80f473013250be9b912772918`
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                // Do something with weather data
                let weatherData = {
                  id: data.city.id,
                  location: data.city.name,
                  country: data.city.country,
                  temperature: data.list[0].main.temp,
                  maxTemperature: data.list[0].main.temp_max,
                  minTemperature: data.list[0].main.temp_min,
                  humidity: data.list[0].main.humidity,
                  feelsLike: data.list[0].main.feels_like,
                  pressure: data.list[0].main.pressure,
                  description: data.list[0].weather[0].main,
                  icon: data.list[0].weather[0].icon,
                  forecastDateOne: data.list[5].dt_txt,
                  forecastMaxTempOne: data.list[5].main.temp_max,
                  forecastMinTempOne: data.list[5].main.temp_min,
                  forecastDateTwo: data.list[13].dt_txt,
                  forecastMaxTempTwo: data.list[13].main.temp_max,
                  forecastMinTempTwo: data.list[13].main.temp_min,
                  forecastDateThree: data.list[21].dt_txt,
                  forecastMaxTempThree: data.list[21].main.temp_max,
                  forecastMinTempThree: data.list[21].main.temp_min,
                };
                setWeather(weatherData);
              })
              .catch((error) => {
                console.error("Error fetching weather data:", error);
              });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  // Effect to update the weather data on to the UI

  const changeWeather = (e) => {
    e.preventDefault();
    const fetchCoords = async () => {
      const coords = await fetch(
        `${api.base}weather?q=${location}&units=metric&APPID=${api.Key}`
      );
      const json = await coords.json();
      // console.log(json);
      console.log(json.coord.lat, json.coord.lon);

      json.coord.lat ? setLatitude(json.coord.lat) : "";
      json.coord.lon ? setLongitude(json.coord.lon) : "";
    };
    fetchCoords();
    // fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.Key}`)
    // .then((res) => res.json())
    // .then((data) => {
    // console.log(data.coord.lat, data.coord.lon);
    // data.coord.lat ? setLatitude(data.coord.lat) : "";
    // data.coord.lon ? setLongitude(data.coord.lon) : "";
    const fetchLocation = async () => {
      const region = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3862ecd80f473013250be9b912772918`
      );
      const result = await region.json();
      console.log(result);
      let weatherData = {
        id: result?.city?.id,
        location: result.city?.name,
        country: result.city?.country,
        temperature: result.list?.[0]?.main.temp,
        maxTemperature: result.list?.[0]?.main.temp_max,
        minTemperature: result.list?.[0]?.main.temp_min,
        humidity: result.list?.[0]?.main.humidity,
        feelsLike: result.list?.[0]?.main.feels_like,
        pressure: result.list?.[0]?.main.pressure,
        description: result.list?.[0]?.weather?.[0]?.main,
        icon: result.list?.[0]?.weather?.[0]?.icon,
        forecastDateOne: result.list?.[5]?.dt_txt,
        forecastMaxTempOne: result.list?.[5]?.main.temp_max,
        forecastMinTempOne: result.list?.[5]?.main.temp_min,
        forecastDateTwo: result.list?.[13]?.dt_txt,
        forecastMaxTempTwo: result.list?.[13]?.main.temp_max,
        forecastMinTempTwo: result.list?.[13]?.main.temp_min,
        forecastDateThree: result.list?.[21]?.dt_txt,
        forecastMaxTempThree: result.list?.[21]?.main.temp_max,
        forecastMinTempThree: result.list?.[21]?.main.temp_min,
      };
      console.log(weatherData.location);
      setWeather(weatherData);
    };
    fetchLocation();

    // //   fetch(
    // //     `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3862ecd80f473013250be9b912772918`
    // //   )
    // //     .then((res) => {
    // //       // console.log(res);
    // //       return res.json();
    // //     })
    // //     .then((result) => {
    // //       console.log(result);
    // //       // Do something with weather data
    // //       let weatherData = {
    // //         id: result?.city?.id,
    // //         location: result.city?.name,
    // //         country: result.city?.country,
    // //         temperature: result.list?.[0]?.main.temp,
    // //         maxTemperature: result.list?.[0]?.main.temp_max,
    // //         minTemperature: result.list?.[0]?.main.temp_min,
    // //         description: result.list?.[0]?.weather?.[0]?.main,
    // //         icon: result.list?.[0]?.weather?.[0]?.icon,
    // //         forecastDateOne: result.list?.[5]?.dt_txt,
    // //         forecastMaxTempOne: result.list?.[5]?.main.temp_max,
    // //         forecastMinTempOne: result.list?.[5]?.main.temp_min,
    // //         forecastDateTwo: result.list?.[13]?.dt_txt,
    // //         forecastMaxTempTwo: result.list?.[13]?.main.temp_max,
    // //         forecastMinTempTwo: result.list?.[13]?.main.temp_min,
    // //         forecastDateThree: result.list?.[21]?.dt_txt,
    // //         forecastMaxTempThree: result.list?.[21]?.main.temp_max,
    // //         forecastMinTempThree: result.list?.[21]?.main.temp_min,
    // //       };
    // //       console.log(weatherData.location);
    // //       setWeather(weatherData);
    // //     });
    // // })
    // .catch((error) => {
    //   console.error("Error fetching weather data:", error);
    // });
  };

  return (
    <div className="App">
      <DisplayComponent
        weatherData={weather}
        changeRegion={changeRegion}
        changeWeather={changeWeather}
        error={error}
      />
    </div>
  );
};

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(<App />);
