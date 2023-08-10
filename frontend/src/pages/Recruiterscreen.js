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
import RecruiterProfile from "./RecruiterProfile";
import RecruiterChat from "./RecruiterChat";
import { useState } from "react";

function RecruiterScreen() {
  const [selectedItem, setSelectedItem] = useState("Overview");
  const [formattedDate, setFormattedDate] = useState("None");
  const [userData, setUserData] = useState({});
  const [foldedView, setFoldedView] = useState(false);
  const username = localStorage.getItem("recruitername");
  const handleItemClick = (itemText) => {
    setSelectedItem(itemText);
  };

  const handleSidebarToggle = () => {
    setFoldedView(!foldedView);
  };

  const fetchUser = async () => {
    const req = {
      username: username,
    };

    try {
      const response = await fetch(`http://localhost:8000/getrecruiter?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(req),
      });
      if (response.status === 404) {
        console.error("User not found");
        return;
      }
      const userData = await response.json();
      console.log(userData);

      setUserData(userData.user);
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <RecruiterSideNav
        foldedView={foldedView}
        handleSidebarToggle={handleSidebarToggle}
        userData={userData}
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
              return  <RecruiterDashboard userData={userData}/>;
            case "Events":
                return <Calendar />;
            case "Graphs":
              return <Graphs />;
            case "Statistics":
              return <Statistics />;
            case "New Application":
              return <CreatePost />;
            case "Chat":
                return <RecruiterChat userData={userData} />;
            case "Profile":
              return <RecruiterProfile userData={userData}/>;
            default:
              return <RecruiterDashboard/>;
          }
        })()}
      </div>
    </div>
  );
}

export default RecruiterScreen;
