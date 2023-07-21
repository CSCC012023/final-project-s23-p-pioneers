import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  AppBar,
  Avatar,
  Toolbar,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logo from "../assets/images/CoBuildLogo.png";

const useStyles = makeStyles({
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

const Step3 = ({ handleSetProfileImage, handleNext, handlePrevious }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedResume, setUploadedResume] = useState([]);
  const [uploadedTranscript, setUploadedTranscript] = useState([]);

  const handlePreviewClick = () => {
    // Implement any custom logic when the profile image preview is clicked
  };

  const handlePreviousClick = () => {
    handlePrevious(); // Trigger the navigation to Step1
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom paddingTop={2}>
        Upload Files
      </Typography>

      <h3>Please upload a resume and transcript</h3>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <label
                  htmlFor="resumeInput"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      boxSizing: "border-box",
                      width: (window.innerWidth/5),
                      height: "160px",
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
                    Import Resume
                  </span>
                  <input
                    type="file"
                    id="resumeInput"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    required
                    capture="user"
                    onChange={(e) => {
                      const files = e.target.files;
                      
                      setUploadedResume([...files]);
                    }}
                  />
                </label>
                {uploadedResume.map((file, index) => (
                  // <div key={index}>
                  //   <span>{file.name}</span>
                  // </div>

                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      paddingTop: "8px",
                      gap: "12px",
                      width: (window.innerWidth/5),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "8px",
                        gap: "12px",
                        width: (window.innerWidth/5),
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
                          width: (window.innerWidth/5),
                          height: "56px",
                          flex: "none",
                          order: "1",
                          flexGrow: "1",
                        }}
                      >
                        <p
                          style={{
                            width: (window.innerWidth/5), // Adjusted width to match the previous div width
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
                            width: (window.innerWidth/5), // Adjusted width to match the previous div width
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
        </Grid>
        <Grid item xs={12} md={6}>
        <label
                  htmlFor="transcriptInput"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      boxSizing: "border-box",
                      width: (window.innerWidth/5),
                      height: "160px",
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
                    Import Transcript
                  </span>
                  <input
                    type="file"
                    id="transcriptInput"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    required
                    capture="user"
                    onChange={(e) => {
                      const files = e.target.files;

                      setUploadedTranscript([...files]);
                    }}
                  />
                </label>
                {uploadedTranscript.map((file, index) => (
                  // <div key={index}>
                  //   <span>{file.name}</span>
                  // </div>

                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      paddingTop: "8px",
                      gap: "12px",
                      width: (window.innerWidth/5),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "8px",
                        gap: "12px",
                        width: (window.innerWidth/5),
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
                          width: (window.innerWidth/5),
                          height: "56px",
                          flex: "none",
                          order: "1",
                          flexGrow: "1",
                        }}
                      >
                        <p
                          style={{
                            width: (window.innerWidth/5) , // Adjusted width to match the previous div width
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
                            width: (window.innerWidth/5), // Adjusted width to match the previous div width
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
        </Grid>
      </Grid>

      

      <Grid container spacing={2} paddingTop={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleNext}
          >
            Continue
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="secondary" fullWidth onClick={handlePrevious}>
            Previous
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step3;