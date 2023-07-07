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

  const handlePreviewClick = () => {
    // Implement any custom logic when the profile image preview is clicked
  };

  const handlePreviousClick = () => {
    handlePrevious(); // Trigger the navigation to Step1
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Upload Files
      </Typography>

      <h3>Please upload a resume, cover letter, or transcript</h3>

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
                    Import Files
                  </span>
                  <input
                    type="file"
                    id="fileInput"
                    accept="application/pdf"
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

        <Box marginTop={2}>
          <Button variant="outlined" onClick={handlePrevious}>
            Previous
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Continue
          </Button>
        </Box>
    </div>
  );
};

export default Step3;
