import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";

function ApplicationDialog({ open, onClose, submit, company, job }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3b3b3b",
      },
      action: {
        disabledBackground: "#2b2b2b",
        disabled: "#3b3b3b",
      },
    },
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);

  const handleResumeChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleCoverLetterChange = (event) => {
    setCoverLetterFile(event.target.files[0]);
  };

  const isSubmitDisabled = !resumeFile || !coverLetterFile;

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: "#1b1b1b" }}>
          Apply for the {job} at {company}
        </DialogTitle>
        <DialogContent sx={{ height: 500, bgcolor: "#3b3b3b" }}>
          {/* Add your dialog content here */}
          <Box sx={{ mt: "0.5rem" }}>
            <Typography variant="h7">How To Apply</Typography>
            <Typography variant="body2" sx={{ ml: "2rem", mt: "0.5rem" }}>
              <ol>
                <li style={{ marginBottom: "0.5rem" }}>
                  Prepare your required documents.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  Visit our website and navigate to the job posting.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  Click on the "Apply" button and fill out the application form.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  Upload your resume and cover letter as attachments.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  Review your application details and submit.
                </li>
              </ol>
            </Typography>
            <Typography variant="h7">Required Documents</Typography>
            <Typography variant="body2" sx={{ ml: "2rem", mt: "0.5rem" }}>
              <ul>
                <li style={{ marginBottom: "0.5rem" }}>Resume</li>
                <li style={{ marginBottom: "0.5rem" }}>Cover Letter</li>
              </ul>
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: "#1b1b1b" }}></Divider>

          <Typography sx={{ marginTop: "0.5rem" }}>Resume</Typography>
          <input
            type="file"
            onChange={handleResumeChange}
            style={{
              marginTop: "0.5rem",
              backgroundColor: "#1b1b1b",
              borderRadius: "20px",
              paddingLeft: "1rem",
              border: "1px dotted #fff",
            }}
          />
          <Typography sx={{ marginTop: "0.5rem" }}>Cover Letter</Typography>
          <input
            type="file"
            onChange={handleCoverLetterChange}
            style={{
              marginTop: "0.5rem",
              backgroundColor: "#1b1b1b",
              borderRadius: "20px",
              paddingLeft: "1rem",
              border: "1px dotted #fff",
            }}
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#1b1b1b" }}>
          <Button
            onClick={onClose}
            color="primary"
            variant="contained"
            size="medium"
            sx={{ mr: "0.5rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            color="primary"
            variant="contained"
            size="medium"
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ApplicationDialog;
