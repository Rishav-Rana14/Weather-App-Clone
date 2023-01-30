import React from "react";
import "./WeatherBox.scss";
const WeatherBox = (props) => {
  const getDay = (date) => {
    let weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    return weekday[new Date(date).getDay()];
  };
  return (
    <div className="weather-box">
      <h1>{props.date ? getDay(props.date) : ""}</h1>
      <img
        src={props.icon && require(`../images/${props.icon}.png`)}
        alt="sun"
      />
      <span className="weather-box-temp space-between flex">
        <div className="weather-box-temp-max">
          {Math.round(props.temp_max - 273.15)}°
        </div>
      </span>
    </div>
  );
};

export default WeatherBox;
