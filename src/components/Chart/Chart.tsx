import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import './styles.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface IChart {
  data: IPoint[] | null;
}

export interface IPoint {
  Wattage: string;
  DateTime: string;
}

const Chart: React.FC<IChart> = ({ data }) => {

  // line chart options setting
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Wattage Consumption Line Chart (Y: Wattage, X: DateTime)",
        padding: {
          top: 20,
          bottom: 20,
        },
        position: "top" as const,
        font: {
          size: 20,
          lineHeight: 1.2,
          weight: "bold",
        },
      },
    },
  };

  return (
    <div className='chartContainer'>
      { data ? (
        <Line
          options={options}
          data={{
            labels: data ? data.map((item) => item.DateTime) : undefined,
            datasets: [
              {
                data: data && data.map((item) => item.Wattage),
                label: "Wattage",
                borderColor: "#3333ff",
                fill: true,
              },
            ],
          }}
        />
      ) : null }
    </div>
  );
};

export default Chart;
