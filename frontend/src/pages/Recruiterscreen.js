import React, { useEffect } from "react";
import Overview from "./components/ApplicationComponents/Overview";
import Graphs from "./components/ApplicationComponents/Graphs";
import Statistics from "./components/ApplicationComponents/Statistics";
import Code from "./components/ApplicationComponents/CodeDisplay";
import Resume from "./components/ApplicationComponents/ResumeDisplay";
import CreatePost from "./CreatePost";
import CoverLetter from "./components/ApplicationComponents/CoverLetterDisplay";
import RecruiterSideNav from "./components/RecruiterSideNav";
import Calendar from "./components/ApplicationComponents/Calendar";
import RecruiterDashboard from "./RecruiterDashboard";
import UserProfile from "./UserProfile"; 

import { useState } from "react";

function RecruiterScreen() {
  const [selectedItem, setSelectedItem] = useState("Overview");
  const [applicationData, setApplicationData] = useState({});
  const [formattedDate, setFormattedDate] = useState("None");
  const [userData, setUserData] = useState({});
  const [foldedView, setFoldedView] = useState(false);

  const handleItemClick = (itemText) => {
    setSelectedItem(itemText);
  };

  const handleSidebarToggle = () => {
    setFoldedView(!foldedView);
  };

  const fetchApplicationData = async (username, id) => {
    const req = {
      username: username,
      jobID: id,
    };

    try {
      const response = await fetch("http://localhost:8000/getApplication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (response.status === 404) {
        console.error("Job not found");
        return;
      }

      const appData = await response.json();
      setApplicationData(appData);
      console.log(appData);
      const date = new Date(appData.submissionTime);
      const day = date.getDate();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthName = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const formattedDate = `${monthName} ${day}, ${year}`;
      setFormattedDate(formattedDate);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async (username) => {
    const req = {
      username: username,
    };

    try {
      const response = await fetch("http://localhost:8000/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (response.status === 404) {
        console.error("User not found");
        return;
      }

      const userData = await response.json();
      setUserData(userData.user);
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplicationData("mini", "6wpXhEFnyLxbZjVcyRJzh3");
  }, []);

  useEffect(() => {
    fetchUser("mini");
  }, []);

  return (
    <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <RecruiterSideNav
        foldedView={foldedView}
        handleSidebarToggle={handleSidebarToggle}
        userData={userData}
        applicationData={applicationData}
        selectedItem={selectedItem}
        handleItemClick={handleItemClick}
        />
      
      <div
        style={{
          background: "#151718",
          height: "100%",
          width: "100%",
        }}
      >
        {(() => {
          switch (selectedItem) {
            case "Overview":
              return  <RecruiterDashboard/>;
            case "Events":
                return <Calendar />;
            case "Graphs":
              return <Graphs />;
            case "Statistics":
              return <Statistics />;
            case "Code":
              return <Code appCode={applicationData.codingQuestionResult} />;
            case "New Application":
              return <CreatePost />;
            case "Profile":
              return <UserProfile />;
            default:
              return <RecruiterDashboard/>;
          }
        })()}
      </div>
    </div>
  );
}

export default RecruiterScreen;
