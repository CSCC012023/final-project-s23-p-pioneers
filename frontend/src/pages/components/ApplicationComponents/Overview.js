import React from "react";
import { Typography, Container, Paper, Grid, Avatar } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import LineGraph from "./LineGraph";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DoughnutChart from "./Doughnut";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GradeIcon from "@mui/icons-material/Grade";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ComplexityGraph from "./ComplexityGraph";

const TableData = [
  { attempts: 1, complexity: "O(1)", score: 90, time: "30m" },
  { attempts: 2, complexity: "O(n)", score: 75, time: "30m" },
  { attempts: 3, complexity: "O(n^2)", score: 60, time: "30m" },
  { attempts: 4, complexity: "O(log(n))", score: 80, time: "30m" },
  { attempts: 5, complexity: "O(log(n))", score: 95, time: "30m" },
];

const handleGitHubClick = () => {
  const githubLink = "https://github.com/andrewaucie"; // Assuming you have a 'github' property in your user object

  if (githubLink === undefined) {
    alert("GitHub link not available.");
  } else {
    window.open(githubLink, "_blank");
  }
}

const TestCard = ({ body, width, radius, height }) => {
  return (
    <Paper
      sx={{
        borderRadius: `${radius}px`,
        minWidth: `${width}px`,
        height: `${height}px`,
        background: "#202123",
        // border: "0.1px solid #808080",
      }}
      elevation={4}
    >
      <Grid
        container
        wrap="nowrap"
        sx={{
          height: "100%",
        }}
      >
        <Grid
          container
          item
          direction="column"
          md={3.5}
          alignItems="center"
          justifyContent={"center"}
          sx={{
            background: "#a259ff",
            borderTopLeftRadius: `${radius}px`,
            borderBottomLeftRadius: `${radius}px`,
          }}
        >
          <Grid item>
            <Avatar
              children={
                <DateRangeIcon sx={{ width: "4rem", height: "4rem" }} />
              }
              sx={{
                mt: "0.5rem",
                background: "#763bc5",
                width: "5rem",
                height: "5rem",
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography variant="h4" sx={{ color: "#808080" }}>
              Submission Date: {body}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const ProfileCardAttributes = ({ icon, color, type, body }) => {
  const IconComponent = icon; // Convert the icon string to an actual component

  return (
    <Grid container item alignItems="center" mt={"1rem"}>
      <Grid item>
        <Avatar sx={{ background: color }}>{IconComponent}</Avatar>
      </Grid>
      <Grid item>
        <Typography variant="v5" sx={{ marginLeft: "0.5rem" }}>
          {type}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" sx={{ marginLeft: "0.5rem" }}>
          {body}
        </Typography>
      </Grid>
    </Grid>
  );
};

const BarGraphCard = ({application}) => {
  return (
    <Grid
      container
      item
      direction="column"
      md={12}
      lg={12}
      justifyContent={"center"}
      mt={"1.5rem"}
      sx={{
        background: "#202123",
        borderRadius: "20px",
      }}
    >
      {/* Line Graph Card Headers*/}
      <Grid container item alignItems="center" mt={"1rem"}>
        <Grid item md={6.8} ml={"2.5rem"}>
          <Typography variant="h6" sx={{ color: "#808080" }}>
            {"Assessment Attempts "}
          </Typography>
        </Grid>
        <Grid item md={4.5}>
          <Typography variant="body2" sx={{ color: "#a259ff" }}>
            {"x-axis=attempt number | y-axis=score "}
          </Typography>
        </Grid>
        {/* Actual Graph */}
        <Grid item md={12} ml={"2.5rem"} sx={{ height: "375px" }}>
          {application.codingQuestionResultArray ? (
          <LineGraph height={"350px"} application={application}/>
            ) : (
              <div>Loading..</div>
            )}
          {/* <LineGraph height={"350px"} application={application} /> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

const ProfileCard = ({ user }) => {
  const handleResumeClick = () => {
    const resumeLink = user.resume;

    if (resumeLink === undefined) {
      alert("You have not uploaded your resume yet!");
    } else {
      window.open(resumeLink, "_blank");
    }
  };

  const handleTranscriptClick = () => {
    const transcriptLink = user.transcript;

    if (transcriptLink === undefined) {
      alert("You have not uploaded your transcript yet!");
    } else {
      window.open(transcriptLink, "_blank");
    }
  };

  const MAX_CHAR_LIMIT = 80;
  const MAX_ITEMS_TO_DISPLAY = 3;

  function truncateString(str, limit) {
    return str.length > limit ? str.slice(0, limit) : str;
  }

  const limitedSkills = user.skills
    ? user.skills.slice(0, MAX_ITEMS_TO_DISPLAY).join(", ")
    : "Unknown Skills";
  const truncatedSkills = truncateString(limitedSkills, MAX_CHAR_LIMIT);

  const limitedCourses = user.courses
    ? user.courses.slice(0, MAX_ITEMS_TO_DISPLAY).join(", ")
    : "Unknown Courses";
  const truncatedCourses = truncateString(limitedCourses, MAX_CHAR_LIMIT);

  return (
    <Grid
      container
      item
      direction={"column"}
      alignItems={"center"}
      md={3.8}
      lg={3.8}
      mt={"1rem"}
      ml={"1rem"}
      wrap="nowrap"
      sx={{
        background: "#202123",
        borderRadius: "20px",
        height: "575px",
        width: "100%",
      }}
    >
      {/* Profile Top */}
      <Grid container item direction={"column"} alignItems={"center"}>
        <Grid item md={1.8} mt={"1rem"}>
          <Avatar sx={{ width: "4rem", height: "4rem" }}>
            <AccountCircleIcon sx={{ width: "4rem", height: "4rem" }} />
          </Avatar>
        </Grid>
        <Grid item mt={"1rem"}>
          <Typography variant="h7" sx={{ color: "#fff" }}>
            {user.username}
          </Typography>
        </Grid>
        <Grid item mt={"0.5rem"}>
          <Typography variant="body2" sx={{ color: "#808080" }}>
            {user.university ? user.university : "Unknown University"}
          </Typography>
        </Grid>
        {/* Resume, LinkedIn, Transcript */}
        <Grid container item mt={"1px"} justifyContent={"center"} spacing={3}>
          <Grid item>
            <Avatar
              children={<PictureAsPdfIcon />}
              sx={{ background: "#FF0000", cursor: "pointer" }}
              onClick={handleResumeClick}
            />
          </Grid>
          <Grid item>
            <Avatar
              children={<GitHubIcon />}
              sx={{ background: "#02040a", cursor: "pointer" }}
              onClick={handleGitHubClick}
            />
          </Grid>
          <Grid item>
            <Avatar
              children={<GradeIcon />}
              sx={{ background: "#00C000", cursor: "pointer" }}
              onClick={handleTranscriptClick}
            />
          </Grid>
        </Grid>
      </Grid>

      <div
        style={{
          width: "90%",
          height: "1px",
          backgroundColor: "#fff",
          marginTop: "1.5rem",
          marginRight: "0.5rem",
        }}
      />
      {/* Below Divider, Program, Skills, Courses */}
      <Grid item container spacing={2} mt={"0rem"}>
        <ProfileCardAttributes
          icon={<PersonSearchIcon />}
          color="#D5B77A"
          type="Username:"
          body={user.username}
        />
        <ProfileCardAttributes
          icon={<AccountBalanceIcon />}
          color="#AA336A"
          type="Program:"
          body={user.program ? user.program : "Unknown Program"}
        />
        <ProfileCardAttributes
          icon={<BorderColorIcon />}
          color="#f0b702"
          type="Skills:"
          body={truncatedSkills}
        />
        <ProfileCardAttributes
          icon={<AlignVerticalBottomIcon />}
          color="#FFA500"
          type="Courses:"
          body={truncatedCourses}
        />
      </Grid>
    </Grid>
  );
};

const ResumeParserCard = ({application}) => {

  return (
    <Grid
      container
      item
      alignItems={"center"}
      md={5}
      mt={"1rem"}
      ml={"1rem"}
      sx={{
        background: "#202123",
        borderRadius: "20px",
        height: "345px",
      }}
    >
      <Grid item ml={"1rem"}>
        <Typography variant="h6" sx={{ color: "#808080" }}>
          Resume Satisfaction
        </Typography>
      </Grid>
      <Grid container item ml={"2.5rem"} mt={"-2rem"}>
        <Grid item md={12}>
          <DoughnutChart
            height={"350px"}
            width={"400px"}
            top={"65%"}
            left={"44%"}
            fontSize={"35px"}
            application={application}
          />
        </Grid>
        <Grid item md={3} mt={"-4.4rem"}>
          <Typography variant="subtitle2">0%</Typography>
        </Grid>
        <Grid item md={6} mt={"-4.4rem"}>
          <Typography variant="subtitle2">Key Word Matcher</Typography>
        </Grid>
        <Grid item md={3} mt={"-4.4rem"}>
          <Typography variant="subtitle2">100%</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const TableCard = ({application}) => {
  const ResultData = application.codingQuestionResultArray;
  console.log(ResultData)
  console.log(TableData)
  return (
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
            {ResultData.map((data, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "#fff" }}>{data.attempts}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{data.complexity}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{data.score}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{data.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

const Overview = ({ user, application, date }) => {
  console.log(application.codingQuestionResultArray);
  return (
    <Container>
      <Grid
        container
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        spacing={2}
        mt={"1.5rem"}
      >
        <Grid container item direction={"column"} md={8}>
          <Grid item md={12}>
            <TestCard
              title={"Submission"}
              body={date}
              width={450}
              radius={20}
              height={130}
            />
          </Grid>
          {/* Line Graph Card */}
          <BarGraphCard application={application}/>
        </Grid>
        {/* Profile Card */}
        <ProfileCard user={user} />
        {/* Doughnut Graph Card */}
        <ResumeParserCard application={application} />

        <Grid
          container
          item
          md={6.6}
          mt={"1rem"}
          ml={"1rem"}
          justifyContent={"center"}
          sx={{
            background: "#202123",
            borderRadius: "20px",
            height: "345px",
          }}
        >
          <Grid item md={12} ml={"0.5rem"}>
            <Typography variant="h6" sx={{ color: "#808080" }}>
              {"Complexity"}
            </Typography>{" "}
          </Grid>
          <Grid item md={12} ml={"0.5rem"}>
            <ComplexityGraph width={"575px"} height={"575px"} />
          </Grid>
        </Grid>
          {application.codingQuestionResultArray ? (
        <TableCard application={application}/>
          ) : (
            <div>Loading..</div>
          )}
      </Grid>
    </Container>
  );
};

export default Overview;