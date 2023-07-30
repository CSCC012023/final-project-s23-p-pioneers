import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TableData = [
  { attempts: 1, complexity: "O(1)", score: 90, time: "30m" },
  { attempts: 2, complexity: "O(n)", score: 75, time: "30m" },
  { attempts: 3, complexity: "O(n^2)", score: 60, time: "30m" },
  { attempts: 4, complexity: "O(log(n))", score: 80, time: "30m" },
  { attempts: 5, complexity: "O(log(n))", score: 95, time: "30m" },
];

const Statistics = () => {
  return (
    <Grid container spacing={2} mt={1} justifyContent={"center"}>
      <Grid container item md={12} mb={1} justifyContent={"center"}>
        <Typography variant="h4">Best Attempt</Typography>
      </Grid>
      <Grid
        container
        item
        md={3.5}
        direction={"column"}
        alignItems={"center"}
        ml={"1rem"}
        sx={{
          background: "#202123",
          borderRadius: "20px",
          height: "305px",
          width: "100%",
        }}
      >
        <Typography>Hi</Typography>
      </Grid>
      <Grid
        container
        item
        md={3.5}
        direction={"column"}
        alignItems={"center"}
        ml={"1rem"}
        sx={{
          background: "#202123",
          borderRadius: "20px",
          height: "305px",
          width: "100%",
        }}
      >
        {" "}
        <Typography>Hi</Typography>
      </Grid>
      <Grid
        container
        item
        md={3.5}
        direction={"column"}
        alignItems={"center"}
        ml={"1rem"}
        sx={{
          background: "#202123",
          borderRadius: "20px",
          height: "305px",
          width: "100%",
        }}
      >
        {" "}
        <Typography>Hi</Typography>
      </Grid>
      <Grid container item md={12} mb={1} justifyContent={"center"}>
        <Typography variant="h4">All Attempts</Typography>
      </Grid>
      <Grid
        container
        item
        md={12}
        mb={"1rem"}
        mt={"1rem"}
        ml={"1rem"}
        p={"1rem"}
        sx={{
          background: "#202123",
          height: "385px",
          borderRadius: "20px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            background: "#202123",
            maxHeight: "470px",
            overflowY: "auto",
          }}
        >
          <Table sx={{}}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Attempts</TableCell>
                <TableCell sx={{ color: "#fff" }}>Complexity</TableCell>
                <TableCell sx={{ color: "#fff" }}>Score</TableCell>
                <TableCell sx={{ color: "#fff" }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TableData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#fff" }}>{data.attempts}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {data.complexity}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>{data.score}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{data.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Statistics;
