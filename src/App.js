import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Description from "./components/Description";
import { getFormattedWeatherData } from "./weatherService";
import { useEffect, useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("paris");
  const [bg, setBg] = useState(hotBg);

  useEffect(
    function () {
      const fetchWeatherData = async () => {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);
        const threshold = units === "metric" ? 20 : 60;
        if (data.temp <= threshold) setBg(coldBg);
        else setBg(hotBg);
      };
      fetchWeatherData();
    },
    [units, city]
  );

  function handleUnitClick(e) {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "\u00B0F" : "\u00B0C";
    setUnits(isCelsius ? "metric" : "imperial");
  }

  function enterKeyPressed(e) {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      console.log(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitClick(e)}>&deg;F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>
                  {weather.name}, {weather.country}
                </h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                {weather.temp.toFixed()} &deg;{units === "metric" ? "C" : "F"}
              </div>
            </div>
            <Description weather={weather} units={units} />
            {/* bottom description */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
