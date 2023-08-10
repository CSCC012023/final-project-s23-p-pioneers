import React from "react";
import { Line } from "react-chartjs-2";

// Function to generate data points for the function
function generateFunctionDataPoints(func, minX, maxX, step) {
  const dataPoints = [];
  for (let x = minX; x <= maxX; x += step) {
    const y = func(x);
    dataPoints.push({ x, y });
  }
  return dataPoints;
}

function func1(x) {
  return x * x;
}

function func2(x) {
  return x;
}

const ComplexityGraph = ({ width, height }) => {
  const minX = 0;
  const maxX = 10;
  const step = 0.1;

  const data = {
    datasets: [
      {
        label: "y = x^2",
        borderColor: "rgba(75, 192, 192, 1)",
        data: generateFunctionDataPoints(func1, minX, maxX, step),
        fill: false,
        showLine: true,
        pointRadius: 0,
      },
      {
        label: "y = x",
        borderColor: "rgba(255, 99, 132, 1)",
        data: generateFunctionDataPoints(func2, minX, maxX, step),
        fill: false,
        showLine: true,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        beginAtZero: true,
      },
      y: {
        type: "linear",
        position: "left",
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: width, height: height }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ComplexityGraph;
