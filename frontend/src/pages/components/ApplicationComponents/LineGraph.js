import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

function LineGraph({ height }) {
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
        backgroundColor: "rgba(162, 89, 255, 0.9)",
        pointBackgroundColor: "#a259ff",
        pointBorderColor: "#ffffff",
        pointRadius: 6,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          color: "#3c3c3c",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        grid: {
          display: false,
          color: "#3c3c3c",
        },
        ticks: {
          color: "#ffffff",
          stepSize: 10,
        },
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div style={{ height: height, width: "95%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default LineGraph;