import React from "react";
import { Paper, Typography, Avatar } from "@mui/material";

const LeaderboardTab = ({
  number,
  avatar,
  username,
  time,
  complexity,
  score,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        mt: "0.5rem",
        display: "grid",
        gridTemplateColumns: "160px 50px 220px 270px 290px auto", // Define the column sizes here
        alignItems: "center",
        borderRadius: "50px",
        backgroundColor: "#3b3b3b",
        marginBottom: "1rem",
        width: "calc(100% - 2rem)",
        padding: "1rem",
        outline: "0.5px solid #3b3b3b",
        transition: "transform 0.3s, box-shadow 0.3s", // Add transition properties
        "&:hover": {
          transform: "scale(1.05)", // Apply scale transform on hover
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Apply box-shadow on hover
          cursor: "pointer", // Change cursor to pointer on hover
        },
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#1b1b1b",
          outline: "2px solid #4b4b4b",
          ml: "5.1rem",
        }}
      >
        {number ? number : 1}
      </Avatar>

      <Avatar sx={{}}></Avatar>

      <Typography
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        {username}
      </Typography>

      <Typography
        sx={{
          color: "#079e4d",
          fontWeight: "bold",
        }}
      >
        {score}
      </Typography>

      <Typography
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        {complexity}
      </Typography>

      <Typography
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        {time} mins
      </Typography>
    </Paper>
  );
};

export default LeaderboardTab;
