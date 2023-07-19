import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, Link, AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import LeaderboardHeaderTab from "./components/LeaderboardHeaderTab";
import LeaderboardTab from "./components/LeaderboardTab";
import { useParams } from "react-router-dom";
// Create a custom theme with the "Work Sans" font
const theme = createTheme({
  typography: {
    fontFamily: "Work Sans, sans-serif",
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-flexContainer": {
            justifyContent: "space-evenly",
          },
        },
        indicator: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&.Mui-selected": {
            color: "#ffffff",
          },
        },
      },
    },
  },
});

function LeaderboardContent({ entities, currentTab }) {
  console.log(entities);
  return (
    <>
      {entities.map((entity, index) => (
        <LeaderboardTab
          key={index}
          number={index + 1}
          username={entity.username}
          time={entity.codingQuestionResult.time}
          complexity={entity.codingQuestionResult.complexity}
          score={entity.codingQuestionResult.score}
        />
      ))}
    </>
  );
}

function Leaderboard() {
  const [currentTab, setCurrentTab] = useState(0);
  const [entities, setEntities] = useState([]); // Use useState for entities
  const [foundJob, setFoundJob] = useState(true);
  const [job, setJob] = useState("404"); // Use useState for job

  const { id } = useParams();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);

    let days = 0;
    if (newValue === 0) {
      days = 1;
    } else if (newValue === 1) {
      days = 7;
    } else if (newValue === 2) {
      days = 30;
    } else {
      days = 365;
    }
    fetchApplications(days);
  };

  const fetchApplications = async (days) => {
    const req = {
      jobID: id,
      days: days,
    };

    try {
      const response = await fetch("http://localhost:8000/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (response.status === 404) {
        // Handle the scenario where the ID does not exist
        console.error("Job not found");
        // You can show an error message to the user or perform any other necessary actions
        setFoundJob(false);
        return;
      }

      const appData = await response.json();
      setEntities(appData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJob = async () => {
    const request = {
      id: id,
    };
    try {
      const response = await fetch("http://localhost:8000/getpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      if (response.status === 404) {
        // Handle the scenario where the ID does not exist
        console.error("Job not found");
        // You can show an error message to the user or perform any other necessary actions
        return;
      }

      const jobData = await response.json();
      console.log(jobData);
      setJob(jobData[0].title);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [job]);

  useEffect(() => {
    fetchApplications(1);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ bgcolor: "#2b2b2b" }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Leaderboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100vh",
          width: "100vw",
          marginBottom: "500px", // Adjust this value to match the height of the BottomNavigation component
        }}
      >
        <Box
          sx={{
            mt: 3,
            mb: 4,
            padding: "1rem",
            ml: -100,
            bgcolor: "#2b2b2b",
          }}
        >
          {foundJob}
          <Link
            href="#"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "0.5rem",
              color: "#3b3b3b",
            }}
          >
            <Typography
              variant="body1"
              component="span"
              color="#969090"
              sx={{ marginBottom: "0.5rem" }}
            >
              {job}
            </Typography>
          </Link>
          <Typography
            variant="h3"
            component="div"
            sx={{ marginBottom: "0.5rem" }}
          >
            Top Submissions
          </Typography>
          <Typography variant="body1" component="div">
            Check out the highest rankings amongst the community
          </Typography>
        </Box>
        <Box sx={{ width: "100%", flex: 1 }}>
          <Paper
            elevation={3}
            sx={{
              bgcolor: "#2b2b2b",
              marginBottom: "1rem",
              width: "100%",
              p: 2,
            }}
          >
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              centered
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Today" />
              <Tab label="This Week" />
              <Tab label="This Month" />
              <Tab label="All Time" />
            </Tabs>
            <LeaderboardHeaderTab></LeaderboardHeaderTab>
            {/* Content for the leaderboard based on the selected tab */}
            {currentTab === 0 && (
              <LeaderboardContent entities={entities} currentTab={0} />
            )}
            {currentTab === 1 && (
              <LeaderboardContent entities={entities} currentTab={1} />
            )}
            {currentTab === 2 && (
              <LeaderboardContent entities={entities} currentTab={2} />
            )}
            {currentTab === 3 && (
              <LeaderboardContent entities={entities} currentTab={3} />
            )}
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Leaderboard;
