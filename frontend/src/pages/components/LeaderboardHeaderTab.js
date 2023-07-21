import React from "react";
import { Paper, Typography } from "@mui/material";

const LeaderboardHeaderTab = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        mt: "0.5rem",
        display: "flex",
        alignItems: "center",
        borderRadius: "50px",
        backgroundColor: "#1b1b1b",
        marginBottom: "1rem",
        width: "calc(100% - 2rem)", // Adjust the width to your preference
        padding: "1rem", // Adjust the padding as needed
        outline: "0.5px solid #3b3b3b", // Add the outline color
      }}
    >
      <Typography
        sx={{
          mr: "1rem",
          color: "#ffffff",
          fontSize: "1.5rem",
          fontWeight: "bold",
          ml: "6rem",
        }}
      >
        #
      </Typography>
      <Typography
        sx={{
          mr: "1rem",
          color: "#ffffff",
          fontWeight: "bold",
          ml: "4rem",
        }}
      >
        Name
      </Typography>
      <Typography
        sx={{
          ml: "auto",
          mr: "13rem",
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        Complexity
      </Typography>
      <Typography
        sx={{
          ml: "1rem",
          mr: "16.5rem",
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        Space
      </Typography>
      <Typography
        sx={{
          ml: "1rem",
          color: "#ffffff",
          fontWeight: "bold",
          mr: "11rem",
        }}
      >
        Time
      </Typography>
    </Paper>
  );
};

export default LeaderboardHeaderTab;
