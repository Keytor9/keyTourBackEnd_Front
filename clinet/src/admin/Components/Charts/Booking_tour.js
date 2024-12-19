import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

function Booking_tour() {

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

const option={
  indexAxis:'y',
  elements:{
    bar:{
      borderWidth:1,
    }
  },
  responsive:true,
  plugins:{
    legend:{
      position:'right'
    },
    title:{
      display:true,
      text:' Horizontal bar chart'
    }
  }
}
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Product A",
      data: [20, 30, 40, 50, 60, 70],
      backgroundColor: "#1C6FEA",
    },
  ],
};

  return (
    <Bar options={option} data={data} />
  );
}

export default Booking_tour;
