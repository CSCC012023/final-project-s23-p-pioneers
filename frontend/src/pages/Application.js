import React from "react";
import Overview from "./components/ApplicationComponents/Overview";
import Graphs from "./components/ApplicationComponents/Graphs";
import Statistics from "./components/ApplicationComponents/Statistics";
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

import { useState } from "react";

function Application() {
  const [selectedItem, setSelectedItem] = useState("Overview");

  const handleItemClick = (itemText) => {
    setSelectedItem(itemText);
  };
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
            sx={{ width: 60, height: 60, mt: "2rem" }}
          />
          <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
            <Typography
              variant="h6"
              fontFamily={"Work Sans"}
              sx={{ mb: "0.5rem" }}
            >
              one
            </Typography>
            <Typography
              variant="body2"
              fontFamily={"Work Sans"}
              sx={{ mb: "1rem" }}
            >
              ashwinmallik@hotmail.com
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
              return <Overview />;
            case "Graphs":
              return <Graphs />;
            case "Statistics":
              return <Statistics />;
            default:
              return <Overview />;
          }
        })()}{" "}
      </div>
    </div>
  );
}

export default Application;
