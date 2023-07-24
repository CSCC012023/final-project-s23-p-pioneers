import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function LineGraph() {
  const labels = ["1", "2", "3", "4", "5"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Assessment Score",
        data: [20, 50, 40, 80, 95],
        fill: false,
        borderColor: "#a259ff",
        tension: 0.1,
        fill: true,
        backgroundColor: "rgba(162, 89, 255, 0.1)",
        pointBackgroundColor: "#a259ff", // Set the data point background color
        pointBorderColor: "#ffffff", // Set the data point border color
        pointRadius: 6, // Increase the data point radius to make them larger
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          color: "#3c3c3c",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        grid: {
          color: "#3c3c3c",
        },
        ticks: {
          color: "#ffffff",
          stepSize: 10, // Set the step size between ticks (optional)
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };
  return <Line data={data} options={options} />;
}

export default LineGraph;
