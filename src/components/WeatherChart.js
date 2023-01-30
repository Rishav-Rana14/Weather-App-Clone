import "chartjs-adapter-date-fns";
import { Chart } from "react-chartjs-2";

import ChartStreaming, {
  StreamingPlugin,
  RealTimeScale,
} from "chartjs-plugin-streaming";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  registerables,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  StreamingPlugin,
  RealTimeScale,
  ChartStreaming
);
ChartJS.register(...registerables);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  bezierCurve: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "hour",
      },
      distribution: "linear",
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      suggestedMin: 25,
      suggestedMax: 40,
    },
  },
};

const WeatherChart = (props) => {
  const { dataObject, daySelected, selectedType } = props;
  const data = {
    labels: dataObject?.[daySelected]?.["time"] ?? [],
    datasets: [
      {
        fill: true,
        label: selectedType,
        data: dataObject?.[daySelected]?.[selectedType] ?? [],
        borderColor: "rgb(247,206,26)",
        backgroundColor: "rgb(76,66,39)",
        lineTension: 0.5,
      },
    ],
  };
  return (
    <div className="forecast-chart row flex justify-center">
      <Chart type="line" options={options} data={data} />
    </div>
  );
};

export default WeatherChart;
