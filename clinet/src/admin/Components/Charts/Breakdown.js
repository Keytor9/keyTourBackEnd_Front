import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Breakdown() {

  let data = [
    {
      label: "Positive",
      value: 132,
      cutout: "80%",
      color: "#1C6FEA",
    },
    {
      label: "Positive",
      value: 42,
      cutout: "80%",
      color: "#FF7A00",
    },
  ];

  const options = {
    plugins: {
      responsive: true,
    },
    cutout: data.map((item) => item.cutout),
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
      },
    ],
  };

  return <Doughnut data={finalData} options={options} />;
}

export default Breakdown;