import React from "react";
import LineGraph from "./ApplicationComponents/LineGraph";
import Overview from "./ApplicationComponents/Overview";
import Resume from "./ApplicationComponents/Resume";

const ApplicationContent = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1a1a1a 10%, #22222c 75%)",
        color: "#1b1b1b",
        height: "100vh",
        width: "100%",
      }}
    >
      <Overview />
    </div>
  );
};

export default ApplicationContent;
