import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {   AppBar, Avatar, Card, CardContent, TextField, Toolbar, CardActions, InputAdornment, Button, Grid, Typography, Paper } from "@mui/material";
import Logo from "../assets/images/CoBuildLogo.png";
import "./ApplicationList.css";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const TestCard = ({ body, name, width, radius, height, linkTo, image, courses, university }) => {

  return (
    <Link to={linkTo} style={{ textDecoration: "none" }}>
      <Paper
        sx={{
          borderRadius: `${radius}px`,
          minWidth: `${width}px`,
          height: `${height}px`,
          background: "#3B3B3B",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
        }}
        elevation={0}
      >
        <Avatar
          src={image}
          sx={{
            width: "70px",
            height: "70px",
            margin: "0 20px",
          }}
        />
        <div>
          <Typography variant="h5" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
            {body}
          </Typography>
          <Typography variant="body1" sx={{ color: "#CCCCCC", marginBottom: "8px" }}>
            Name: {name}
          </Typography>
          {courses && courses.length > 0 && (
            <Typography variant="body1" sx={{ color: "#CCCCCC", marginBottom: "8px" }}>
              Courses:{" "}
              {courses.map((course, index) => (
                <span key={index} className="comma">
                  {course}
                  {index !== courses.length - 1 && <span className="comma">, </span>}
                </span>
              ))}
            </Typography>
          )}
          {university && (
            <Typography variant="body1" sx={{ color: "#CCCCCC" }}>
              University: {university}
            </Typography>
          )}
        </div>
        <div style={{ marginLeft: "auto", marginRight: "20px" }}>
          <OpenInNewIcon fontSize="small" sx={{ color: "#CCCCCC" }} />
        </div>
      </Paper>
    </Link>
  );
};

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const { id } = useParams();
  const [foundJob, setFoundJob] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [shouldFilter, setShouldFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [userData, setUserData] = useState("");
  const [imageData, setImageData] = useState("");
  const [university, setUniversity] = useState("");
  const [courses, setCourses] = useState([]);

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setLocation(value);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const fetchJobIds = () => {
    if (!shouldFilter) {
      return;
    }

    let requestType = "all";

    if (selectedFilter === "Latest") {
      requestType = "latest";
    } else if (selectedFilter === "Deadline") {
      requestType = "deadline";
    }
    else if(selectedFilter == "Expired")
    {
      requestType = "expired";
    }

    const requestOptions = {
      requestType: requestType,
    };

    console.log("lmao"); // Log "lmao" when the API request is made



    fetch("http://localhost:8000/getpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestOptions),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs(data);

        // Apply title and location filters
        const filtered = data.filter((job) => {
          const titleMatch = search ? job.title.toLowerCase().includes(search.toLowerCase()) : true;
          const locationMatch = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true;
          return titleMatch && locationMatch;
        });

        setFilteredJobs(filtered);
      })
      .catch((error) => {
        console.error("Error fetching job posts:", error);
      })
      .finally(() => {
        setShouldFilter(false);
      });
  };

  const handleGoButtonClick = () => {
    setShouldFilter(true);
  };

  useEffect(() => {
    setSelectedFilter("All"); // Set the initial filter to "All"
    setShouldFilter(true); // Trigger the initial API request
  }, []);

  useEffect(() => {
    fetchJobIds();
  }, [shouldFilter, search, location]);
  
  useEffect(() => {
    const fetchData = async () => {
      const userDataPromises = applications.map((application) =>
        fetchUserData(application.username)
      );
  
      const userDataArray = await Promise.all(userDataPromises);
      
      // Extract name and profilePic data from the returned userDataArray
      const names = userDataArray.map((data) => data.name);
      const images = userDataArray.map((data) => data.profilePic);
      const university = userDataArray.map((data) => data.university || "Undefined");
      const courses = userDataArray.map((data) => data.courses || ["None"]);

      setUserData(names);
      setImageData(images);
      setUniversity(university);
      setCourses(courses);
    };
  
    fetchData();
  }, [applications]);

  const fetchUserData = async (username) => {
    try {

      const response = await fetch("http://localhost:8000/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      console.log(data.user.name);
      const name = data.user.name;
      const profilePic = data.user.profilepic;
      const university = data.user.university;  
  
      const courses = data.user.courses;

      return {name, profilePic, university, courses};

    } catch (error) {
      console.error("Error fetching user data:", error);
      return { name: "", profilePic: "" };
    }
  };

  // Function to fetch applications
  const fetchApplications = async (days) => {
    const req = {
      jobID: id,
      days: days,
    };

    try {
      const response = await fetch("http://localhost:8000/getapplicants", {
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
      setApplications(appData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch applications when the component mounts
 useEffect(() => {

    fetchApplications(1); // Pass the jobId to fetchApplications
  }, []); // Add jobId as a dependency to the useEffect hook

  return (
      <div>
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
            Applications
          </Typography>
          <Typography
            style={{ float: "left", fontFamily: "work sans", fontSize: "25px" }}
          >
            Browse through applicants for the job application
          </Typography>

          <TextField
            fullWidth
            label="Search For Applications"
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
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <Button
              variant="outlined"
              size="small"
              style={{
                color: selectedFilter === "All" ? "#A259FF" : "#FFFFFF",
                borderColor: selectedFilter === "All" ? "#A259FF" : "#FFFFFF",
              }}
              onClick={() => handleFilterClick("All")}
            >
              All
            </Button>
            <Button
              variant="outlined"
              size="small"
              style={{
                color: selectedFilter === "Latest" ? "#A259FF" : "#FFFFFF",
                borderColor: selectedFilter === "Latest" ? "#A259FF" : "#FFFFFF",
              }}
              onClick={() => handleFilterClick("Latest")}
            >
              Latest
            </Button>
            <Button
              variant="outlined"
              size="small"
              style={{
                color: selectedFilter === "Deadline" ? "#A259FF" : "#FFFFFF",
                borderColor: selectedFilter === "Deadline" ? "#A259FF" : "#FFFFFF",
              }}
              onClick={() => handleFilterClick("Deadline")}
            >
              Deadline
            </Button>
            <Button
              variant="outlined"
              size="small"
              style={{
                color: selectedFilter === "Expired" ? "#A259FF" : "#FFFFFF",
                borderColor: selectedFilter === "Expired" ? "#A259FF" : "#FFFFFF",
              }}
              onClick={() => handleFilterClick("Expired")}
            >
              Expired
            </Button>
          </div>
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
              Applications
            </Button>
          </Grid>
        </Grid>

      </div>
    </div>
    
    <div style={{ marginBottom: "20px" }}></div>

  <Grid container item justifyContent="center">
        <Grid container item direction="column" md={8}>
        {applications.length === 0 ? (
       
       <Typography variant="h6">No applications found</Typography>
        ) : (
          applications.map((application, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <TestCard
                title={"Application"}
                body={application.username}
                name={userData[index]}
                width={450}
                radius={20}
                height={130}
                linkTo={`/application/` +  application.applicationId}
                image={imageData[index]}
                courses={courses[index]}
                university={university[index]}
              />
            </div>
          ))
        )}

        </Grid>
      </Grid>
    </div>

    );
};

export default ApplicationList;