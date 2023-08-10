import React, { useEffect } from "react";
import Overview from "./components/ApplicationComponents/Overview";
import Graphs from "./components/ApplicationComponents/Graphs";
import Statistics from "./components/ApplicationComponents/Statistics";
import Code from "./components/ApplicationComponents/CodeDisplay";
import Resume from "./components/ApplicationComponents/ResumeDisplay";
import CoverLetter from "./components/ApplicationComponents/CoverLetterDisplay";

import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Logo from "../assets/images/CoBuildLogo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CodeIcon from "@mui/icons-material/Code";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useParams } from "react-router-dom";

import { useState } from "react";

function Application() {
  const [selectedItem, setSelectedItem] = useState("Overview");
  const [applicationData, setApplicationData] = useState({});
  const [formattedDate, setFormattedDate] = useState("None");
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  const handleItemClick = (itemText) => {
    setSelectedItem(itemText);
  };

  const fetchApplicationData = async () => {
    const req = {
      applicationId: id,
    };
    try {
      console.log(req);
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
      console.log("3");

      const appData = await response.json();
      setApplicationData(appData);
      console.log("4");
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
      fetchUser(appData.username);
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
    fetchApplicationData();
  }, []);

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            background: "linear-gradient(180deg, #050911 10%, #050911 75%)",
            borderRight: "0.5px solid #5b5b5b",
            borderTop: "0.5px solid #5b5b5b",
            borderBottom: "0.5px solid #5b5b5b",
          },
        }}
      >
        <div
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            alt="User Avatar"
            src={userData.profilepic}
            sx={{ width: 60, height: 60, mt: "2rem" }}
          />
          <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
            <Typography
              variant="h6"
              fontFamily={"Work Sans"}
              sx={{ mb: "0.5rem" }}
            >
              {applicationData.username}
            </Typography>
            <Typography
              variant="body2"
              fontFamily={"Work Sans"}
              sx={{ mb: "1rem" }}
            >
              {userData.email}
            </Typography>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#1a1a1a",
                margin: "1px auto 1px auto",
              }}
            />
            <List>
              {[
                { text: "Overview", icon: <DashboardIcon /> },
                { text: "Resume", icon: <PictureAsPdfIcon /> },
                { text: "Cover Letter", icon: <QueryStatsIcon /> },
              ].map((item) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ mb: "0.5rem" }}
                  onClick={() => handleItemClick(item.text)}
                >
                  <ListItemButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "#3A2F55",
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#1a1a1a",
                margin: "1px auto",
              }}
            />
            <List>
              {[
                { text: "Code", icon: <CodeIcon /> },
                { text: "Graphs", icon: <SignalCellularAltIcon /> },
                { text: "Statistics", icon: <TextSnippetIcon /> },
              ].map((item) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ mb: "0.5rem" }}
                  onClick={() => handleItemClick(item.text)}
                >
                  <ListItemButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "#3A2F55",
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#1a1a1a",
                margin: "1px auto",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#1a1a1a",
                margin: "9rem auto 0 auto",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
                marginLeft: "1rem",
              }}
            >
              <img
                src={Logo}
                alt="CoBuild Logo"
                style={{ width: "40px", height: "40px", marginRight: "8px" }}
              />
              <Typography
                variant="h5"
                fontFamily={"Work Sans"}
                fontWeight={"Bold"}
                sx={{ color: "#fff" }}
              >
                CoBuild
              </Typography>
            </div>
          </div>
        </div>
      </Drawer>{" "}
      {/* Actual Content */}
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
              return (
                <Overview
                  user={userData}
                  application={applicationData}
                  date={formattedDate}
                />
              );
            case "Graphs":
              return <Graphs application={applicationData} />;
            case "Statistics":
              return <Statistics appStats={applicationData}/>;
            case "Code":
              return <Code appCode={applicationData.codingQuestionResult} />;
            case "Resume":
              return <Resume resume={userData.resume}/>;
            case "Cover Letter":
              return <CoverLetter resume={userData.resume} />;
            default:
              return (
                <Overview
                  user={userData}
                  application={applicationData}
                  date={formattedDate}
                />
              );
          }
        })()}
      </div>
    </div>
  );
}

export default Application;