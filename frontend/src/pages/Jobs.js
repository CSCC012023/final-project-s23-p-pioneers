import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JobPosting from "./components/Card";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Typography,
  Button,
  Grid,
  TextField,
  BottomNavigation,
  Toolbar,
  InputAdornment,
} from "@mui/material";
import Logo from "../assets/images/CoBuildLogo.png";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [shouldFilter, setShouldFilter] = useState(false);

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setLocation(value);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  useEffect(() => {
    fetchJobIds();
  }, []);

  useEffect(() => {
    if (shouldFilter) {
      filterJobs();
    }
  }, [shouldFilter]);

  const fetchJobIds = () => {
    console.log("hello");
    fetch("http://localhost:8000/getpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching job posts:", error);
      });
  };

  const filterJobs = () => {
    const filtered = jobs.filter((job) => {
      const titleMatch = search ? job.title.toLowerCase().includes(search.toLowerCase()) : true;
      const locationMatch = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
      return titleMatch && locationMatch;
    });
    setFilteredJobs(filtered);
    setShouldFilter(false);
  };

  const handleGoButtonClick = () => {
    setShouldFilter(true);
  };

  return (
    <div style={{ backgroundColor: "#3B3B3B" }}>
      {/* Render job list or perform actions with jobIds */}
      <AppBar position="relative" style={{ background: "#2B2B2B", height: "80px" }}>
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            height: "80px",
            justifyContent: "space-between",
          }}
        >
          <Avatar alt="Logo" src={Logo} style={{ width: "35px", height: "35px" }} />
          <Typography
            variant="h6"
            style={{
              fontWeight: "bold",
              marginLeft: "25px",
              fontSize: "30px",
              fontFamily: "work sans",
            }}
          >
            CoBuild
          </Typography>

          <Button
            component={Link}
            to="/login"
            style={{
              background: "#A259FF",
              marginLeft: "auto",
              width: "120px",
              height: "60px",
              borderRadius: "20px",
              fontWeight: 600,
              color: "#FFFFFF",
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "140%",
              fontFamily: "work sans",
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ paddingTop: "20px", backgroundColor: "#2B2B2B" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "0px",
            gap: "30px",
            width: "1050px",

            margin: "0 auto",
          }}
        >
          <Typography
            variant="h4"
            style={{
              float: "left",
              fontFamily: "work sans",
              fontWeight: "bold",
              fontSize: "45px",
            }}
          >
            Browse Job Postings
          </Typography>
          <Typography
            stlye={{ float: "left", fontFamily: "work sans", fontSize: "25px" }}
          >
            Browse through more than 100s of job postings on CoBuild Job Board
          </Typography>

          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            value={location}
            onChange={handleLocationChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FFFFFF", // White border color
                  "&:hover": {
                    borderColor: "#A259FF !important", // Purple border color on hover
                  },
                },
                "& input": {
                  color: "#FFFFFF", // White text color
                },
              },
              "& .MuiInputLabel-root": {
                color: "#FFFFFF", // White text color for the label
              },
            }}
          >
            Location
          </TextField>
          <TextField
            fullWidth
            label="Search For Jobs"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FFFFFF", // White border color
                  "&:hover": {
                    borderColor: "#A259FF !important", // Purple border color on hover
                  },
                },
                "& input": {
                  color: "#FFFFFF", // White text color
                },
              },
              "& .MuiInputLabel-root": {
                color: "#FFFFFF", // White text color for the label
              },
            }}
          >
            Search For Jobs
          </TextField>
          <Button
            variant="contained"
            onClick={handleGoButtonClick}
            sx={{
              backgroundColor: "#A259FF",
              fontFamily: "work sans",
              fontWeight: 600,
              color: "#FFFFFF",
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "140%",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#FFFFFF",
                color: "#A259FF",
              },
            }}
          >
            Filter
          </Button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          alignSelf: "stretch",
          backgroundColor: "#2B2B2B",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          padding: "20px", // Increase the padding value to add more space at the bottom
        }}
      >
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#3B3B3B",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                transition: "background-color 0.3s",
                height: "calc(100% - 10px)",
                fontFamily: "work sans",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#A259FF")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3B3B3B")}
            >
              Jobs
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#3B3B3B",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                transition: "background-color 0.3s",
                height: "calc(100% - 10px)",
                fontFamily: "work sans",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#A259FF")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3B3B3B")}
            >
              Assessments
            </Button>
          </Grid>
        </Grid>

      </div>
      <JobPosting prop={filteredJobs} />

    </div>
  );
}

export default Jobs;
