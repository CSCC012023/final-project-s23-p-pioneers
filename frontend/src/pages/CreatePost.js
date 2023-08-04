import React, { useState } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

import {
  Container,
  Grid,
  Box,
  Typography,
  alpha,
  Button,
  TextField,
  IconButton,
  ThemeProvider,
  createTheme,
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
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [title, setTitle] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [skills, setSkills] = React.useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const navigate = useNavigate()

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

  const handleDeadlineChange = (newValue) => {
    setSelectedDate(newValue);
  };


  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };
  //   const handleDateChange = (event) => {
  //     setDatePosted(event.target.value);
  //   };

  const handleCreateAssessments = () => {
    // Handle create assessments logic here
    handleSubmit()
    navigate("/upload")
  };
  const createJobPosting = async (jobData) => {
  
    try {
      const response = await fetch("http://localhost:8000/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const data = await response.json();
        return data.jobId;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Job posting request failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  const handleSubmit = async (event) => {
    // event.preventDefault();
    const rname = localStorage.getItem("recruitername");
    const { name: companyName } = await fetch(`http://localhost:8000/getcompanyname?username=${rname}`).then(res => res.json());
    const { logo: logo } = await fetch(`http://localhost:8000/getcompanylogo?username=${rname}`).then(res => res.json());
    console.log(logo);
    const jobData = {
      title,
      location,
      jobDescription,
      companyName,
      deadline: selectedDate,
      isAssessmemnt: false,
      skills: ["C++", "Java", "Python", "Test"],
      companyLogo: logo,
    };

    try {
      const jobId = await createJobPosting(jobData);
      console.log("Job posting created successfully. Job ID:", jobId);

      // Save the jobId to localStorage or use it as needed
      localStorage.setItem("tempJobId", jobId);

      // Navigate to the upload page or any other page as needed
    } catch (error) {
      console.error("Error creating job posting:", error.message);
      // Handle the error as needed
    }
  };

  const colorTheme = createTheme({
    palette: {
      primary: {
        main: "#c599ff", //light purple
      },
      secondary: {
        main: "#A259FF" // mid-light purple
      },
    },

    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {color: '#d30909'},
        },
      },
    },
  });

  return (
    <Container maxWidth="md">
      <Box>
        <Box textAlign="center" marginBottom={2}>
          <Typography marginTop={(window.innerHeight/8)/32}
            variant="h2"
            sx={{ color: "white", }}
          >
            Create Post
          </Typography>
        </Box>

        <form className="job-form" style={{ background: "transparent" }}>
          <Grid container spacing={2} >
            <ThemeProvider theme={colorTheme}>
              <Grid item xs={12}>
                <TextField
                  label="Job Title"
                  variant="outlined"
                  value={title}

                  onChange={handleTitleChange}
                  required
                  fullWidth
                  color="primary"
                  sx={{
                    "& .MuiInputLabel-root": {color: 'primary.main'},
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "primary.main" },
                    },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  // sx={{
                  //   background: "transparent",
                  //   border: "none",
                  //   "& .MuiInputLabel-root": {
                  //     display: "block",
                  //     color: "#000000",
                  //     backgroundColor: "transparent",
                  //     borderRadius: "4px",
                  //     padding: "4px",
                  //     borderColor: "#4A90E2", // Set border color to blue shade
                  //   },
                  //   "& .MuiInputLabel-root.Mui-focused": {
                  //     backgroundColor: "#FFFFFF",
                  //   },"& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  //     backgroundColor: "#FFFFFF", // White background when shrunk
                  //   },
                  //   "& .MuiOutlinedInput-root": {
                  //     borderRadius: "20px",
                  //     borderColor: "transparent",
                  //     backgroundColor: "#FFFFFF",
                  //     "& fieldset": {
                  //       borderRadius: "20px",
                  //       borderColor: "transparent",
                  //       "&:hover": {
                  //         borderColor: "#A259FF !important",
                  //       },
                  //     },
                  //     "& input": {
                  //       color: "#000000",
                  //     },
                  //   },
                  // }}
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
                  color="primary"
                  sx={{
                    "& .MuiInputLabel-root": {color: 'primary.main'},
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "primary.main" },
                    },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  // sx={{
                  //   background: "transparent",
                  //   border: "none",
                  //   "& .MuiInputLabel-root": {
                  //     display: "block",
                  //     color: "#000000",
                  //     backgroundColor: "transparent",
                  //     borderRadius: "4px",
                  //     padding: "4px",
                  //     borderColor: "#4A90E2", // Set border color to blue shade
                  //   },"& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  //     backgroundColor: "#FFFFFF", // White background when shrunk
                  //   },
                  //   "& .MuiInputLabel-root.Mui-focused": {
                  //     backgroundColor: "#FFFFFF",
                  //   },
                  //   "& .MuiOutlinedInput-root": {
                  //     borderRadius: "20px",
                  //     borderColor: "transparent",
                  //     backgroundColor: "#FFFFFF",
                  //     "& fieldset": {
                  //       borderRadius: "20px",
                  //       borderColor: "transparent",
                  //       "&:hover": {
                  //         borderColor: "#A259FF !important",
                  //       },
                  //     },
                  //     "& input": {
                  //       color: "#000000",
                  //     },
                  //   },
                  // }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Job Description"
                  variant="outlined"
                  value={jobDescription}
                  onChange={handleDescriptionChange}
                  required
                  multiline
                  fullWidth
                  color="primary"
                  sx={{
                    "& .MuiInputLabel-root": {color: 'primary.main'},
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "primary.main" },
                    },
                  }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                  // sx={{
                  //   background: "transparent",
                  //   border: "none",
                  //   "& .MuiInputLabel-root": {
                  //     display: "block",
                  //     color: "#000000",
                  //     backgroundColor: "transparent",
                  //     borderRadius: "4px",
                  //     padding: "4px",
                  //     borderColor: "#4A90E2", // Set border color to blue shade
                  //   },
                  //   "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  //     backgroundColor: "#FFFFFF", // White background when shrunk
                  //   },
                  //   "& .MuiInputLabel-root.Mui-focused": {
                  //     backgroundColor: "#FFFFFF",
                  //   },
                  //   "& .MuiOutlinedInput-root": {
                  //     borderRadius: "20px",
                  //     borderColor: "transparent",
                  //     backgroundColor: "#FFFFFF",
                  //     "& fieldset": {
                  //       borderRadius: "20px",
                  //       borderColor: "transparent",
                  //       "&:hover": {
                  //         borderColor: "#A259FF !important",
                  //       },
                  //     },
                  //     "& input": {
                  //       color: "#000000",
                  //     },
                  //   },
                  // }}
                />
              </Grid>
              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Deadline"
                value={selectedDate}
                onChange={handleDeadlineChange}
                renderInput={(params) => (
                  <TextField
                    {...params.inputProps}
                    fullWidth
                    variant="outlined"
                    sx={{
                      // Styles for dark theme with white preview text and better contrast colors
                      "& .MuiInputLabel-root": {
                        color: "#FFFFFF", // Set the preview text (label) color to white
                      },
                      "& .MuiInputBase-input": {
                        color: "#FFFFFF", // Set the input text color to white
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#FFFFFF", // Set the outline color to white
                      },
                      "& .MuiPickersBasePicker-container": {
                        backgroundColor: "#111111", // Set the background color to black
                      },
                      "& .MuiPickersToolbar-toolbar": {
                        backgroundColor: "#111111", // Set the toolbar background color to black
                        color: "#FFFFFF", // Set the toolbar text color to white
                      },
                      "& .MuiPickersDay-day": {
                        color: "#FFFFFF", // Set the day text color to white
                      },
                      "& .MuiPickersDay-daySelected": {
                        backgroundColor: "#A259FF", // Set the selected day background color to a contrast color
                        color: "#FFFFFF", // Set the selected day text color to white
                      },
                      "& .MuiPickersDay-dayDisabled": {
                        color: "#8B8B8B", // Set the disabled day text color to a softer contrast color
                      },
                      "& .MuiPickersClock-pin": {
                        backgroundColor: "#A259FF", // Set the clock pin color to a contrast color
                      },
                      "& .MuiPickersClockPointer-thumb": {
                        backgroundColor: "#A259FF", // Set the clock pointer thumb color to a contrast color
                      },
                      "& .MuiPickersClockPointer-noPoint": {
                        backgroundColor: "#A259FF", // Set the clock pointer no point color to a contrast color
                      },
                      "& .MuiPickersClockPointer-pointer": {
                        backgroundColor: "#A259FF", // Set the clock pointer color to a contrast color
                      },
                      "& .MuiPickersCalendarHeaderRoot": {
                        backgroundColor: "#000000",
                      },
                    }}
                    // sx={{
                    //   background: "transparent",
                    //   border: "none",
                    //   "& .MuiInputLabel-root": {
                    //     display: "block",
                    //     color: "#000000",
                    //     backgroundColor: "transparent",
                    //     borderRadius: "4px",
                    //     padding: "4px",
                    //     borderColor: "#00000", // Set border color to blue shade
                    //   },
                    //   "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                    //     backgroundColor: "#FFFFFF", // White background when shrunk
                    //   },
                    //   "& .MuiInputLabel-root.Mui-focused": {
                    //     backgroundColor: "#FFFFFF",
                    //   },
                    //   "& .MuiOutlinedInput-root": {
                    //     borderRadius: "20px",
                    //     borderColor: "transparent",
                    //     backgroundColor: "#FFFFFF",
                    //     "& fieldset": {
                    //       borderRadius: "20px",
                    //       borderColor: "transparent",
                    //       "&:hover": {
                    //         borderColor: "#A259FF !important",
                    //       },
                    //     },
                    //     "& input": {
                    //       color: "#000000",
                    //     },
                    //   },
                    // }}
                  />
                )}
              />
            </LocalizationProvider>
              </Grid>
            </ThemeProvider>
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
                  {/* <label
                    htmlFor="file-upload"
                    style={{ display: "flex", alignItems: "center" }}
                  >
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
                  </label> */}
                  <label
                    htmlFor="fileInput"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "16px", // Add margin bottom to create space

                    }}
                  >
                    <span
                      style={{
                        boxSizing: "border-box",
                        width: "850px",
                        height: "160px",
                        justifyItems: "center",
                        background: "#e5e0fc",
                        border: "2px dashed #7A5FEC", // Adjust border color and thickness
                        borderRadius: "8px",
                        transition: "transform 0.3s ease",
                        transform: "scale(1)",
                        /* Inside auto layout */
                        flex: "none",
                        order: "0",
                        alignSelf: "stretch",
                        flexGrow: "0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#7A5FEC",
                        WebkitTextStrokeWidth: "1px",
                        fontWeight: "normal",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.animation = "circle 1s infinite linear";
                        e.target.style.transform = "scale(1.05)"; // Increase the scale on hover
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.animation = "none";
                        e.target.style.transform = "scale(1)"; // Reset the scale when not hovered
                      }}
                    >
                      Import Files
                    </span>
                    <input
                      type="file"
                      id="fileInput"
                      accept="application/pdf/png/jpeg"
                      style={{ display: "none" }}
                      required
                      capture="user"
                      onChange={(e) => {
                        const files = e.target.files;
                        const updatedFiles = [...uploadedFiles];

                        for (let i = 0; i < files.length; i++) {
                          updatedFiles.push(files[i]);
                        }

                        setUploadedFiles(updatedFiles);
                      }}
                    />
                  </label>

                  {uploadedFiles.map((file, index) => (
                  <div key={index} style={{ marginBottom: "8px", backgroundColor: "#575361", padding: "8px", borderRadius: "8px" }}>
                    <p
                      style={{
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "130%",
                        color: "#FFFFFF", // Set text color to white
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        margin: 0, // Reset margin to remove any default spacing
                      }}
                      title={file.name} // Add the title attribute to display the full name on hover
                    >
                      {file.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter'",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "12px",
                        lineHeight: "130%",
                        color: "#FFFFFF", // Set text color to white
                        margin: 0, // Reset margin to remove any default spacing
                      }}
                    >
                      {Math.round(file.size / 1024)} KB
                    </p>
                  </div>
                ))}
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
      </Box> 

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