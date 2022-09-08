import "./App.scss";
import { useEffect, useState } from "react";
import WeatherBoxes from "./components/WeatherBoxes";
import WeatherChart from "./components/WeatherChart";
import { getCurrentWeather, getForecastWeather } from "./api/api";
import WeatherDetails from "./components/WeatherDetails";
const App = () => {
  const [selectedType, setSelectedType] = useState("Temperature");
  const [days, setDays] = useState([]);
  const [dataObject, setDataObject] = useState({});
  const [daySelected, setDaySelected] = useState(0);
  const [city, setCity] = useState("Noida");
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 0,
    precipitation: 0,
    humidity: 0,
    wind: 0,
    icon: "",
  });
  useEffect(() => {
    getWeather();
  }, []);
  const getWeather = () => {
    getCurrentWeather(city)
      .then((res) => {
        setCurrentWeather({
          temperature: Math.round(res.data.main?.temp - 273) ?? 0,
          humidity: res.data.main?.humidity ?? 0,
          precipitation:
            res.data.main?.precipitation?.value ??
            res.data.main?.rain?.["1h"] ??
            0,
          wind: Math.round(res.data?.wind?.speed * 3.6) ?? 0,
          icon: res.data.weather?.[0]?.icon ?? "",
          city: res.data.name ?? "",
          description: res.data.weather?.[0]?.description ?? "",
          error: false,
        });
      })
      .catch(() => {
        setCurrentWeather({ ...currentWeather, error: true });
      });
    getForecastWeather(city).then((res) => {
      updateState(res.data);
    });
  };
  const updateState = (data) => {
    const temp_days = [];
    const dayIndices = getDayIndices(data);
    for (let i = 0; i < 5; i++) {
      temp_days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp_max: data.list[dayIndices[i]].main.temp_max,
        temp_min: data.list[dayIndices[i]].main.temp_min,
      });
    }
    setDays(temp_days);
  };
  const getDayIndices = (data) => {
    let dayIndices = [];
    const infoObject = {};
    dayIndices.push(0);
    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);
    for (let i = 0; i < 5; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== "00"
      ) {
        if (!infoObject[i]) {
          infoObject[i] = {
            time: [],
            Temperature: [],
            Humidity: [],
            Precipitation: [],
          };
        }
        infoObject[i]["time"].push(data.list[index].dt * 1000);
        infoObject[i]["Temperature"].push(
          Math.round(data.list[index].main.temp - 273.15)
        );
        infoObject[i]["Humidity"].push(data.list[index].main.humidity);
        infoObject[i]["Precipitation"].push(data.list[index].pop * 1000);
        index++;
      }

      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    setDataObject(infoObject);
    return dayIndices;
  };

  return (
    <div className="App">
      <WeatherDetails
        currentWeather={currentWeather}
        selectedType={selectedType}
        city={city}
        selectedTypeChange={(type) => setSelectedType(type)}
        cityChange={(newCity) => setCity(newCity)}
        search={() => getWeather()}
      />
      <div className="chart">
        <WeatherChart
          dataObject={dataObject}
          daySelected={daySelected}
          selectedType={selectedType}
        />
      </div>
      <div className="forecast-boxes row flex justify-center">
        <WeatherBoxes
          days={days}
          daySelected={daySelected}
          boxClick={(index) => {
            setDaySelected(index);
          }}
        />
      </div>
    </div>
  );
};

export default App;
