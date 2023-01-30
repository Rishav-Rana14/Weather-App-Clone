import React from "react";

const WeatherDetails = (props) => {
  const {
    currentWeather,
    selectedType,
    city,
    selectedTypeChange,
    cityChange,
    search,
  } = props;
  return (
    <div className="header flex space-between align-center flex-wrap">
      <div>
        <div className="row header-description flex align-center flex-wrap">
          <div>
            {currentWeather.icon !== "" && (
              <img
                src={require(`../images/${currentWeather.icon}.png`)}
                alt="icon"
              />
            )}
          </div>
          <div className="flex flex-wrap">
            <div className="current-temp">{currentWeather.temperature}</div>
            <div className="flex current-temp-unit pointer">
              <div className="selected">°C</div>
            </div>
          </div>

          <div>
            <div>Precipitation: {currentWeather.precipitation}%</div>
            <div>Humidity: {currentWeather.humidity}%</div>
            <div>Wind: {currentWeather.wind} km/h</div>
          </div>
          <div>
            <h1>{currentWeather.city}</h1>
            <p>{currentWeather.description}</p>
          </div>
        </div>

        <div className="row data-select flex space-between">
          <div
            className={selectedType === "Temperature" ? "selected" : ""}
            onClick={() => {
              selectedTypeChange("Temperature");
            }}
          >
            Temperature
          </div>
          <span>|</span>
          <div
            className={selectedType === "Precipitation" ? "selected" : ""}
            onClick={() => {
              selectedTypeChange("Precipitation");
            }}
          >
            Precipitation
          </div>
          <span>|</span>
          <div
            className={selectedType === "Humidity" ? "selected" : ""}
            onClick={() => {
              selectedTypeChange("Humidity");
            }}
          >
            Humidity
          </div>
        </div>
      </div>
      <div>
        <div>Show Data For:</div>
        <div className="flex space-between align-center flex-wrap">
          <input
            placeholder="city"
            value={city}
            onChange={(res) => {
              cityChange(res.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
          />
          <button
            className="btn btn-primary btn-round-1"
            onClick={() => search()}
          >
            Search
          </button>
        </div>
        {currentWeather.error && (
          <div className="error">Please Enter Valid City</div>
        )}
      </div>
    </div>
  );
};

export default WeatherDetails;
