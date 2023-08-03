import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";
import RecruiterSteps2 from "./RecruiterSteps2";
import RecruiterSteps3 from "./RecruiterSteps3";

const useStyles = makeStyles({
  dropdownMenu: {
    backgroundColor: "grey",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "0%", // Adjust the left margin as needed
  },
  uploadContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 16,
  },
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: "50%",
  },
  button: {
    marginTop: 16,
  },
});




const languages = [
  { label: "Java", image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png' },
  { label: "Python", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png' },
  { label: "C", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png' },
  { label: "C++", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png' },
  { label: "JavaScript", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png' },
  { label: "PHP", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png' },
  { label: "SQL", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sql_data_base_with_logo.png/1200px-Sql_data_base_with_logo.png' },
  { label: "Ruby", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1200px-Ruby_logo.svg.png' },
  { label: "Swift", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/1200px-Swift_logo.svg.png' },
  { label: "Go", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1200px-Go_Logo_Blue.svg.png' },
  { label: "R", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/1200px-R_logo.svg.png' },
  { label: "MATLAB", image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/1200px-Matlab_Logo.png' },
  // Add more languages with their respective images
];

const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: (window.innerHeight),
  alignItems: "flex-start",
  justifyContent: "top",
});

const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#c599ff", //light purple
    },
    secondary: {
      main: "#A259FF" // mid-light purple
    },
  },
});

const Container = styled("div")({
  width: (window.innerWidth/5) * 2,
  marginLeft: "30%",
});

const LanguageBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(1, 0),
}));

const LanguageImage = styled("img")({
  width: "30px",
  height: "30px",
  marginRight: "8px",
});

const ContinueButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const RecruiterSteps1 = ({ handleNext }) => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const classes = useStyles();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const totalSteps = 4;

  const navigate = useNavigate();

  const handleContinue = async (event) => {
    event.preventDefault();
    const rname = localStorage.getItem("recruitername");
    fetch('http://localhost:8000/updaterecruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("recruitername"),
        field: 'name',
        value: company, // Replace with the desired value
      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle the error
        console.error('Error:', error);
      });

    fetch('http://localhost:8000/updaterecruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("recruitername"),
        field: 'description',
        value: description, // Replace with the desired value
      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle the error
        console.error('Error:', error);
      });

      fetch('http://localhost:8000/updaterecruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("recruitername"),
        field: 'location',
        value: location, // Replace with the desired value
      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle the error
        console.error('Error:', error);
      });

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const type = "logo";
    const extension = "png";
    const {url} = await fetch(`http://localhost:8000/s3Url?username=recruiter${rname}&type=${type}&extension=${extension}`).then(res => res.json());
    const finalUrl = url.split("?")[0];
    console.log("frontend", finalUrl)

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file
    });

    await fetch('http://localhost:8000/updaterecruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: rname,
        field: "logo",
        value: finalUrl }) // Replace with actual data
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle the error
        console.error('Error:', error);
      });
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    navigate("/User"); // Navigate to the final page
  };
  const handleContinueClick = (event) => {
    handleContinue(event); // Call handleContinue and pass the event object
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    if (event.key === "Enter" && value.trim() !== "") {
      const existingLanguage = languages.find(
        (language) => language.label.toLowerCase() === value.trim().toLowerCase()
      );

      if (!existingLanguage) {
        const newLanguage = {
          label: value.trim(),
          image: "", // Set a default image for new languages
        };
        setSelectedLanguages((prevSelectedLanguages) => [
          ...prevSelectedLanguages,
          newLanguage,
        ]);
      }

      event.target.value = "";
    }
  };

  const handleLanguageChange = (_, value) => {
    setSelectedLanguages(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.target.value.trim();
      if (value !== "") {
        const newLanguage = {
          label: value,
          image: "", // Set a default image for new languages
        };
        if (!selectedLanguages.some((language) => language.label === newLanguage.label)) {
          setSelectedLanguages((prevSelectedLanguages) => [
            ...prevSelectedLanguages,
            newLanguage,
          ]);
        }
        event.target.value = "";
      }
    }
  };

  const renderOption = (props, option, state) => (
    <li {...props} className={state.selected ? 'selected' : ''}>
      <Box display="flex" alignItems="center">
        <LanguageImage src={option.image} alt={option.label} />
        <Typography variant="body1">{option.label}</Typography>
      </Box>
    </li>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div>
            
            <Typography
              variant="h5"
              sx={{
                fontFamily: "work sans",
                fontWeight: "bold",
                fontSize: "35px",
              }}
              gutterBottom paddingTop={4}
            >
              Company Information
            </Typography>

        <TextField
            label="Name"
            sx={{
            "& .MuiInputLabel-root": {color: 'primary.main'},
            "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "primary.main" },
            },
            }}
            fullWidth
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            InputProps={{
            style: { color: "white" },
            }}
        />

         <Box marginTop={2} />

            <TextField
                label="Description"
                sx={{
                "& .MuiInputLabel-root": {color: 'primary.main'},
                "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "primary.main" },
                },
                }}
                fullWidth
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                InputProps={{
                style: { color: "white" },
                }}
            />
            
            <Box marginTop={2} />

            <TextField
                label="Location"
                sx={{
                "& .MuiInputLabel-root": {color: 'primary.main'},
                "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "primary.main" },
                },
                }}
                fullWidth
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                InputProps={{
                style: { color: "white" },
                }}
            />

            <Box marginTop={2} />
              
            <Grid container spacing={7} sx={{ marginTop: "10px", justifyContent: "flex-start", marginLeft: "0px"}}> 
            <div className={classes.root}>

          <label
                  htmlFor="fileInput"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      boxSizing: "border-box",
                      width: "330px",
                      height: "100px",
                      background: "#F3F0FF",
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
                    Import Logo (.png, .jpg, .jpeg)
                  </span>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/jpg, image/png"
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
                  // <div key={index}>
                  //   <span>{file.name}</span>
                  // </div>

                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "0px",
                      gap: "12px",
                      width: "330px",
                      height: "160px", // Adjusted height to match the previous div length
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "8px",
                        gap: "12px",
                        width: "330px",
                        height: "72px",
                        background: "#FFFFFF",
                        boxShadow: "4px #EAE2FD",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "56px",
                          background: "#DAF2D9",
                          borderRadius: "4px",
                          flex: "none",
                          order: "0",
                          flexGrow: "0",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          padding: "0px",
                          gap: "4px",
                          width: "254px",
                          height: "56px",
                          flex: "none",
                          order: "1",
                          flexGrow: "1",
                        }}
                      >
                        <p
                          style={{
                            width: "254px", // Adjusted width to match the previous div width
                            height: "18px",
                            fontFamily: "Inter",
                            fontStyle: "normal",
                            fontWeight: 700,
                            fontSize: "14px",
                            lineHeight: "130%",
                            display: "flex",
                            alignItems: "center",
                            color: "#575361",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                          title={file.name} // Add the title attribute to display the full name on hover
                        >
                          {file.name}
                        </p>
                        <p
                          style={{
                            width: "254px", // Adjusted width to match the previous div width
                            height: "16px",
                            fontFamily: "'Inter'",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "12px",
                            lineHeight: "130%",
                            display: "flex",
                            alignItems: "center",
                            color: "#857E95",
                            flex: "none",
                            order: "1",
                            alignSelf: "stretch",
                            flexGrow: "0",
                          }}
                        >
                          {Math.round(file.size / 1024)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

             </div>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ContinueButton
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleContinueClick}
                >
                  Continue
                </ContinueButton>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" color="secondary" fullWidth onClick={handleFinish} >
                  I'll do this later
                </Button>
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return <RecruiterSteps2 handleNext={handleContinue} handlePrevious={handlePrevious} />;
      case 3:
        return <RecruiterSteps3 handleNext={handleContinue} handlePrevious={handlePrevious}/>;
      default:
        return null;
    }
  };

  return (
    <RootContainer>
      <Container>
        <Box mb={2} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: (window.innerHeight/8)/5,
        }}>
          <LinearProgress
            variant="determinate"
            value={(activeStep / totalSteps) * 100}
          />
        </Box>
        <ThemeProvider theme={colorTheme}>
          {renderStepContent()}
        </ThemeProvider>
      </Container>
    </RootContainer>
  );
};

export default RecruiterSteps1;