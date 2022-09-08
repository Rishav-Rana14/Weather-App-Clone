import axios from "axios";
const client = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});
const apiKey = "6557810176c36fac5f0db536711a6c52";

export const getCurrentWeather = (city) => {
  return client.request({
    url: `weather?q=${city}&appid=${apiKey}`,
    method: "GET",
  });
};
export const getForecastWeather = (city) => {
  return client.request({
    url: `forecast/?q=${city}&appid=${apiKey}`,
    method: "GET",
  });
};
