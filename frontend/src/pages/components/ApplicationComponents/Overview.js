import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import LineGraph from "./LineGraph";

const Card = ({ title, body }) => {
  return (
    <Paper
      sx={{
        background: "linear-gradient(135deg, #3b3b3b 30%, #2e0753 90%)",
        borderRadius: "10px",
        width: "100%",
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

const BigCard = ({ title, body }) => {
  return (
    <Paper
      sx={{
        background: "linear-gradient(135deg, #2e0753 30%, #3b3b3b 90%)",
        borderRadius: "10px",
        width: "48%",
        height: "270px",
        mt: "1.5rem",
        padding: "1rem",
        ml: "0.5rem",
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
      <Grid
        container
        direction="row"
        wrap="nowrap"
        justifyContent={"center"}
        spacing={2}
        alignItems="stretch"
      >
        <Grid container item direction="column" sx={{ width: "40%" }}>
          <Card title={"Submission Time"} body={"July 21, 2023"} />
          <Card title={"Coding Question"} body={"Done"} />
          <Card title={"Complexity Analysis"} body={"O(n)"} />
          <Card title={"Time Analysis"} body={"15 mins"} />
          <Card title={"Score"} body={"100"} />
        </Grid>
        <Grid container item direction="column">
          <Grid
            container
            item
            direction={"column"}
            sx={{
              background: "linear-gradient(135deg, #251B3B 30%, #2e0753 90%)",
              borderRadius: "10px",
              mt: "1.5rem",
            }}
          >
            <Grid item sx={{ width: "800px", height: "440px", pt: "0.5rem" }}>
              <Typography variant="h7" sx={{ color: "#fff", ml: "0.5rem" }}>
                Assessment Score
              </Typography>
              <LineGraph />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2} mt={1} ml={0.1}>
            <BigCard title={"Submission Time"} body={"July 21, 2023"} />
            <BigCard title={"Submission Time"} body={"July 21, 2023"} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Overview;
