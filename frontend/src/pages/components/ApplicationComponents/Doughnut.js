import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const data = {
  datasets: [
    {
      data: [2, 1],
      backgroundColor: ["#336699", "#99CCFF"],
      display: true,
      borderColor: "#D1D6DC",
    },
  ],
};

const DoughnutChart = ({ height, width, top, left, fontSize, application }) => {
  if (!application) {
    return <div> Loading... </div>;
  }
  return (
    <div style={{ position: "relative", width: width, height: height }}>
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          rotation: -90,
          circumference: 180,
          cutout: "60%",
          maintainAspectRatio: true,
          responsive: true,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: top,
          left: left,
          transform: "translate(-50%, -50%)",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: fontSize }}>{application.resumeScore}%</div>
      </div>
    </div>
  );
};

export default DoughnutChart;
