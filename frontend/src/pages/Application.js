import React from "react";
import Sidebar from "./components/Sidebar";
import ApplicationContent from "./components/ApplicationContent";

function Application() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <ApplicationContent />
    </div>
  );
}

export default Application;
