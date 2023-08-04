import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TerminalIcon from "@mui/icons-material/Terminal";
import ScoreIcon from "@mui/icons-material/Score";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TableData = [
  { attempts: 1, complexity: "O(1)", score: 90, time: "30m" },
  { attempts: 2, complexity: "O(n)", score: 75, time: "30m" },
  { attempts: 3, complexity: "O(n^2)", score: 60, time: "30m" },
  { attempts: 4, complexity: "O(log(n))", score: 80, time: "30m" },
  { attempts: 5, complexity: "O(log(n))", score: 95, time: "30m" },
];

const AttemptCard = ({ colour, icon, body }) => {
  return (
    <>
      <Grid
        container
        item
        md={3.5}
        ml={1}
        mr={1}
        sx={{
          background: "#202123",
          borderRadius: "20px",
          height: "305px",
          width: "100%",
        }}
      >
        <Grid
          container
          item
          md={13}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            background: colour,
            height: "100px",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
          ml={-2}
          mt={-1.5}
        >
          {icon}
        </Grid>
        <Grid
          container
          item
          md={12}
          justifyContent={"center"}
          alignItems={"center"}
          mb={6}
        >
          <Typography variant="h2" fontWeight={"bold"}>
            {body}{" "}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const Statistics = ({appStats}) => {
  console.log(appStats);
  const ResultData = appStats.codingQuestionResultArray;
  const AppData = appStats.codingQuestionResult;
  if (!ResultData) {
    return <div>Loading...</div>; // Return a loading indicator if data is not available yet
  }
  console.log(ResultData);
  return (
    <Grid container spacing={2} mt={1} justifyContent={"center"}>
      <Grid container item md={12} mb={1} pb={1} justifyContent={"center"}>
        <Typography
          sx={{
            background: "#202123",
            width: "50%",
            borderRadius: "20px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#808080",
            fontSize: "28px",
          }}
        >
          Best Attempt
        </Typography>
      </Grid>
      <AttemptCard
        colour={"#a259ff"}
        icon={<TerminalIcon sx={{ fontSize: "4rem" }} />}
        body={AppData.complexity}
      />
      <AttemptCard
        colour={"#ff5a5a"}
        icon={<ScoreIcon sx={{ fontSize: "4rem" }} />}
        body={AppData.score}
      />
      <AttemptCard
        colour={"#87CEEB"}
        icon={<AccessTimeIcon sx={{ fontSize: "4rem" }} />}
        body={AppData.time + " mins"}
      />
      <Typography
        mt={2}
        sx={{
          background: "#202123",
          width: "50%",
          borderRadius: "20px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#808080",
          fontSize: "28px",
        }}
      >
        All Attempts
      </Typography>
      <Grid
        container
        item
        md={11}
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
              {ResultData.map((data, index) => (
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