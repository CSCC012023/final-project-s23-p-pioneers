import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const Card = ({ title, body, bodyColor }) => {
  return (
    <Paper
      sx={{
        background: "linear-gradient(135deg, #251B3B 30%, #5514B4 90%)",
        borderRadius: "10px",
        width: "30%",
        height: "130px",
        mt: "1.5rem",
        padding: "1rem",
      }}
      elevation={4}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        height="100%"
      >
        <Grid item>
          <Typography variant="h7" sx={{ color: "#fff" }}>
            {title}
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          height="60%"
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {body === "Done" && (
              <DoneOutlineIcon
                sx={{ fontSize: "1.2rem", marginRight: "0.5rem" }}
              />
            )}
            {body}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Overview = () => {
  return (
    <Container maxWidth="lg">
      <Card title={"Submission Time"} body={"July 21, 2023"} />
      <Card
        title={"Coding Question"}
        body={"Done"}
        bodyColor={
          "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
        }
      />
    </Container>
  );
};

export default Overview;
