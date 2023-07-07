import React, { useState } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";
import {
  Container,
  Grid,
  Box,
  Typography,
  alpha,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import "./CreatePost.css"; // Import custom CSS file for styling

const jobsData = [
  {
    title: "Software Engineer",
    company: "Amazon",
    location: "San Francisco",
    type: "Full-time",
    image:
      "https://signsalad.com/wp-content/uploads/2021/11/Screenshot-2021-11-03-at-12.14.11.png",
  },
  {
    title: "Software Engineer",
    company: "Amazon",
    location: "San Francisco",
    type: "Full-time",
    image:
      "https://thumbs.dreamstime.com/b/amazon-logo-editorial-vector-illustration-market-136495269.jpg",
  },
  {
    title: "Software Engineer",
    company: "Apple",
    location: "San Francisco",
    type: "Full-time",
    image: "https://img.freepik.com/free-icon/mac-os_318-10374.jpg",
  },
  {
    title: "Software Engineer",
    company: "Netflix",
    location: "San Francisco",
    type: "Full-time",
    image:
      "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
  },
  {
    title: "Software Engineer",
    company: "Google",
    location: "San Francisco",
    type: "Full-time",
    image:
      "https://www.googlewatchblog.de/wp-content/uploads/google-logo-perfekt.jpg",
  },

  {
    title: "Software Engineer",
    company: "Nokia",
    location: "San Francisco",
    type: "Full-time",
    image:
      "https://www.nokia.com/sites/default/files/styles/scale_1440_no_crop/public/2023-02/nokia-refreshed-logo-2_1.png",
  },

  // Add more job objects here...
];

function JobPosting() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [skills, setSkills] = React.useState("");
  //const [datePosted, setDatePosted] = React.useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };
  //   const handleDateChange = (event) => {
  //     setDatePosted(event.target.value);
  //   };

  const handleCreateAssessments = () => {
    // Handle create assessments logic here
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const job = {
      title,
      location,
      jobDescription,
      companyName,
      deadline,
      skills: ["C++", "Java", "Python", "Test"],
    };

    fetch("http://localhost:8000/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Job posting request failed.");
        }
      })
      .then((data) => {
        console.log(data); // handle the response from the server
        setTitle("");
        setLocation("");
        setJobDescription("");
        setCompanyName("");
        setDeadline("");
        setSkills("");
        //setDatePosted('');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" marginBottom={2}>
        <Typography
          variant="h2"
          sx={{ color: "white", fontFamily: "Work-Sans" }}
        >
          Create Post
        </Typography>
      </Box>

      <form className="job-form" style={{ background: "transparent" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              required
              fullWidth
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "16px 20px",
                gap: "12px",
                width: "804px",
                height: "46px",
                background: "#FFFFFF",
                border: "1px solid #858584",
                borderRadius: "20px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Location"
              variant="outlined"
              value={location}
              onChange={handleLocationChange}
              required
              fullWidth
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "16px 20px",
                gap: "12px",
                width: "804px",
                height: "46px",
                background: "#FFFFFF",
                border: "1px solid #858584",
                borderRadius: "20px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Description"
              variant="outlined"
              multiline
              rows={4}
              value={jobDescription}
              onChange={handleDescriptionChange}
              required
              fullWidth
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px 20px",
                gap: "12px",
                width: "804px",
                height: "576px",
                background: "#FFFFFF",
                border: "1px solid #858584",
                borderRadius: "20px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Deadline"
              variant="outlined"
              value={deadline}
              onChange={handleDeadlineChange}
              required
              fullWidth
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "16px 20px",
                gap: "12px",
                width: "804px",
                height: "46px",
                background: "#FFFFFF",
                border: "1px solid #858584",
                borderRadius: "20px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              variant="outlined"
              value={companyName}
              onChange={handleCompanyNameChange}
              required
              fullWidth
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "16px 20px",
                gap: "12px",
                width: "804px",
                height: "46px",
                background: "#FFFFFF",
                border: "1px solid #858584",
                borderRadius: "20px",
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <input
                  accept="*"
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {/* <IconButton color="primary" component="span">
                  <CloudUpload />
                </IconButton> */}
                  <TextField
                    label="Upload Files"
                    variant="outlined"
                    value={selectedFile ? selectedFile.name : ""}
                    fullWidth
                    disabled
                    style={{
                      boxSizing: "border-box",
                      width: "804px",
                      height: "160px",
                      background: "#F3F0FF",
                      border: "1px dashed #C1B2FA",
                      borderRadius: "8px",
                    }}
                  />
                </label>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 50px",
              gap: "12px",
              width: "440px",
              height: "60px",
              background: "#A259FF",
              borderRadius: "20px",
            }}
            onClick={handleCreateAssessments}
          >
            Create Optional Assessments
          </Button>
        </div>

        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 50px",
              gap: "12px",
              width: "235px",
              height: "60px",
              background: "#A259FF",
              borderRadius: "20px",
            }}
            onClick={handleSubmit}
          >
            Submit Post
          </Button>
        </div>
      </div>

      <div className="more-company-container">
        <div className="more-company-text">More from this company</div>
        <button className="go-to-company-button">
          <RxOpenInNewWindow className="button-icon" />
          Go to company page
        </button>
      </div>

      <div className="job-grid-container">
        <JobGrid jobs={jobsData} />
      </div>
    </Container>
  );
}

const JobGrid = ({ jobs }) => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "20px", marginBottom: "50px" }}>
      {" "}
      {/* Adjust the maxWidth value as per your design */}
      <Grid container spacing={2}>
        {jobs.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No job postings from this company</Typography>
          </Grid>
        ) : (
          jobs.map((job, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  position: "relative",
                  padding: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 4,
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
                  },
                  "&:hover::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: alpha("#A259FF", 0.2),
                    zIndex: 1,
                  },
                }}
              >
                <img
                  src={job.image}
                  alt={job.title}
                  style={{
                    width: "100%",
                    height: "295px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />

                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    fontFamily: "Work Sans",
                    fontStyle: "Sans Serif",
                    fontWeight: 600,
                    fontSize: "22px",
                    lineHeight: "140%",
                  }}
                >
                  {job.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontFamily: "Work Sans, sans-serif",
                    color: "white",
                  }}
                >
                  {`${job.company} • ${job.location} • ${job.type}`}
                </Typography>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default JobPosting;
