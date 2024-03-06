import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

DisplyComponent = ({ weatherData, changeRegion, changeWeather, error }) => {
  const [sec, setSec] = useState("");
  // console.log(weatherData);
  // Check if weatherData is defined and forecastDateOne is set before accessing it
  const forecastDateOne =
    weatherData && weatherData.forecastDateOne
      ? weatherData.forecastDateOne
      : "";

  // Split forecastDateOne only if it is not empty
  const forecastDateParts = forecastDateOne.split(" ")[0];

  const forecastDateTwo =
    weatherData && weatherData.forecastDateTwo
      ? weatherData.forecastDateTwo
      : "";

  // Split forecastDateOne only if it is not empty
  const forecastDatePartsTwo = forecastDateTwo.split(" ")[0];

  const forecastDateThree =
    weatherData && weatherData.forecastDateThree
      ? weatherData.forecastDateThree
      : "";

  // Split forecastDateOne only if it is not empty
  const forecastDatePartsThree = forecastDateThree.split(" ")[0];

  const temp = weatherData.temperature - 273.15;
  const minTemp = weatherData.minTemperature - 273.15;
  const maxTemp = weatherData.maxTemperature - 273.15;
  const minTempDayOne = weatherData.forecastMinTempOne - 273.15;
  const maxTempDayOne = weatherData.forecastMaxTempOne - 273.15;
  const minTempDayTwo = weatherData.forecastMinTempTwo - 273.15;
  const maxTempDayTwo = weatherData.forecastMaxTempTwo - 273.15;
  const minTempDayThree = weatherData.forecastMinTempThree - 273.15;
  const maxTempDayThree = weatherData.forecastMaxTempThree - 273.15;
  const realFeel = weatherData.feelsLike - 273.15;

  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const day = d.toDateString().split().slice(0, 3)

  const hour = h > 12 ? h - 12 : h;
  const minute = m < 10 ? "0" + m : m;
  const amPm = h >= 12 ? "PM" : "AM";
  function updateSec() {
    let s = d.getSeconds();
    s < 10 ? "0"+setSec(s) :setSec(s)
    // setSec(s);
    // console.log(sec)
  }
  setTimeout(() => {
    updateSec();
  }, 1000);

  return (
    <>
      <h1>Weather App</h1>
      <div className="main">
        <div className="ist-half">
          {error && <ErrorMessage />}

          <div className="ist-half-istdiv">
            <h2>{weatherData.location}</h2>
            <p>({weatherData.country})</p>
          </div>
          <h1 className="temp">{temp.toFixed(0)}°C</h1>
          <div className="min-max-temp">
            <h4>{weatherData.description}</h4>
            <p className="min-max">
              Min: {minTemp.toFixed(0)}°C | Max:
              {maxTemp.toFixed(0)}°C
            </p>
          </div>
          <div className="time">
            {hour}:{minute}:{""+sec} {amPm}
          </div>
          <div className="date-day-month">{day}</div>
        </div>
        <div className="sec-half">
          <form onSubmit={(e) => changeWeather(e)}>
            <input
              type="text"
              placeholder="Enter Location"
              onChange={(e) => changeRegion(e.target.value)}
            />
          </form>

          <div className="forecast-main-div">
            <div className="date-temp">
              <div className="date">
                {/* Display forecastDateOne parts if available */}
                {forecastDateParts}
              </div>
              <div className="temp-min-max">
                {minTempDayOne.toFixed(0)}°C | {maxTempDayOne.toFixed(0)}°C
              </div>
            </div>

            <div className="date-temp">
              <div className="date">
                {/* Display forecastDateOne parts if available */}
                {forecastDatePartsTwo}
              </div>
              <div className="temp-min-max">
                {minTempDayTwo.toFixed(0)}°C | {maxTempDayTwo.toFixed(0)}°C
              </div>
            </div>

            <div className="date-temp">
              <div className="date">
                {/* Display forecastDateOne parts if available */}
                {forecastDatePartsThree}
              </div>
              <div className="temp-min-max">
                {minTempDayThree.toFixed(0)}°C | {maxTempDayThree.toFixed(0)}°C
              </div>
            </div>
            <div className="feels-like">
              <p>feels like</p>
              <p>{realFeel.toFixed(0)}°C</p>
            </div>
            <div className="humidity">
              <p>Humidity</p>
              <p>{weatherData.humidity}</p>
            </div>
            <div className="pressure">
              <p>Pressure</p>
              <p>{weatherData.pressure}mbar</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DisplyComponent;
