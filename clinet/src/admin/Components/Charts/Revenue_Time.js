import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function Revenue_Time(ChartData) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


  return (
    <Bar
      data={{
        // Name of the variables on x-axies for each bar
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            // Label for bars
            label: "total count/value",
            // Data or value of your each variable
            data: [1552, 1319, 613, 1400, 13, 1450],
            // Color of each bar
            backgroundColor: [
              "#1C6FEA",
              "#1C6FEA",
              "#1C6FEA",
              "#1C6FEA",
              "#1C6FEA",
              "#1C6FEA",
            ],
            // Border color of each bar
            borderColor: [
              "#1C6FEA",
              "#1C6FEA",
              "#1C6FEA",
              "#1C6FEA",
              "#1C6FEA",
              "#1C6FEA",
            ],
            borderWidth: 0.5,
          },
        ],
      }}
      // Height of graph
      height={400}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontSize: 15,
          },
        },
      }}
    />
  );
}

export default Revenue_Time;
