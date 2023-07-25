import React from "react";
import { Paper, Typography } from "@mui/material";

const LeaderboardHeaderTab = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        mt: "0.5rem",
        display: "grid",
        gridTemplateColumns: "170px 260px 270px 290px auto", // Define the column sizes here
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
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        Name
      </Typography>
      <Typography
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        Score
      </Typography>
      <Typography
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        Complexity
      </Typography>
      <Typography
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        Time
      </Typography>
    </Paper>
  );
};

export default LeaderboardHeaderTab;
