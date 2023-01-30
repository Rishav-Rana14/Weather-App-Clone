import WeatherBox from "./WeatherBox";
const WeatherBoxes = (props) => {
  const { days, daySelected, boxClick } = props;
  const boxes = days.map((day, index) => {
    return (
      <li
        className={"pointer " + (index === daySelected ? "selectedDay" : "")}
        onClick={() => {
          boxClick(index);
        }}
        key={index}
      >
        <WeatherBox {...day} />
      </li>
    );
  });
  return (
    <>
      <ul className="weather-box-list">{boxes}</ul>
    </>
  );
};
export default WeatherBoxes;
