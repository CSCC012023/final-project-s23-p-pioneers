import React, { } from "react";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Logo from "../../assets/images/CoBuildLogo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CodeIcon from "@mui/icons-material/Code";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function SideNavBar(props) {
    // Extract props from the parent component, if needed
    const { foldedView, handleSidebarToggle, userData, applicationData, selectedItem, handleItemClick } = props;
    const activeIconStyle = {
        backgroundColor: "#3A2F55",
    };

    return (

        <Drawer
        variant="permanent"
        anchor="left"
        open={!foldedView} 
        sx={{
          width: foldedView ? 97 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: foldedView ? 97 : 240,
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
            sx={{
                width: foldedView ? 40 : 60, // Conditionally set the width based on foldedView
                height: foldedView ? 40 : 60, // Conditionally set the height based on foldedView
                mt: "2rem",
            }}
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
              
              {!foldedView && userData.email} {/* Conditionally render text */}
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
                      display: "flex", // Use Flexbox layout for the container
                      justifyContent: "center", // Center the content horizontally
                      ...(item.text === selectedItem && activeIconStyle),
                    }}
                    > 
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {foldedView && ( // Conditionally apply margin to icons when in folded view
                        <ListItemIcon sx={{ marginLeft: "0.5rem" }}>
                            {item.icon}
                        </ListItemIcon>
                        )}
                        {!foldedView && <ListItemIcon>{item.icon}</ListItemIcon>}
                    </div>
                    {/* Show text only when not in folded view */}
                    {!foldedView && <ListItemText primary={item.text} />}

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
                        display: "flex", // Use Flexbox layout for the container
                        justifyContent: "center", // Center the content horizontally
                      ...(item.text === selectedItem && activeIconStyle),
                    }}
                  >

                    <div style={{ display: "flex", alignItems: "center" }}>
                        {foldedView && ( // Conditionally apply margin to icons when in folded view
                        <ListItemIcon sx={{ marginLeft: "0.5rem" }}>
                            {item.icon}
                        </ListItemIcon>
                        )}
                        {!foldedView && <ListItemIcon>{item.icon}</ListItemIcon>}
                    </div>
                    {/* Show text only when not in folded view */}
                    {!foldedView && <ListItemText primary={item.text} />}

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
            {/* <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#1a1a1a",
                margin: "9rem auto 0 auto",
              }}
            /> */}
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
            {!foldedView && ( // Conditional check: Show Typography only when sidebar is not folded
                <Typography
                variant="h5"
                fontFamily={"Work Sans"}
                fontWeight={"Bold"}
                sx={{ color: "#fff"}}
                // sx={{ color: "#fff", marginLeft: "1rem", marginTop: "1rem" }}
                >
                CoBuild
                </Typography>
            )}
            </div>
          </div>
        </div>
        <div
            style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
                display: "flex",
                justifyContent: foldedView ? "center" : "flex-end", // Center when folded, right-align when expanded
                paddingRight: "8px",
            }}
            >
            <IconButton
                sx={{
                backgroundColor: "#3A2F55",
                "&:hover": {
                    backgroundColor: "#3A2F55",
                },
                }}
                onClick={handleSidebarToggle}
            >
                {!foldedView ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>


      </Drawer>
    );
  }
  
  // Export the SideNavBar component
  export default SideNavBar;