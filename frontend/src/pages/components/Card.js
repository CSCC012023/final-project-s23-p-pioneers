import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import "../JobPosting.css"; // Import custom CSS file for styling
import { useNavigate } from "react-router-dom";

function JobPosting(prop) {
  const navigate = useNavigate();

  return (
    <div>
      <JobGrid jobs={prop.prop} />
    </div>
  );
}

const JobGrid = ({ jobs }) => {
  const navigate = useNavigate();
  const handleClick = (jobId) => {
    navigate("/jobpost/" + jobId);
  };
  return (
    <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
      {/* Adjust the maxWidth value as per your design */}
      <Grid container spacing={2}>
        {jobs.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No job postings from this company</Typography>
          </Grid>
        ) : (
          jobs.map((job, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => handleClick(job.jobId)}
            >
              <Box
                sx={{
                  padding: 3,
                  border: "1px solid rgba(224, 224, 224, 0)",
                  borderRadius: 4,
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow:
                      "0px 4px 12px rgba(0, 0, 0, 0.2), 0px 0px 20px 5px rgba(219, 203, 178, 0.5)",
                  },
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  backgroundColor: "#2B2B2B",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={job.companyLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"}
                    alt={job.title}
                    style={{
                      width: "100%",
                      height: "50%", // Adjusted height to match the top half of the box
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap", // Added flex-wrap property
                    padding: "10px 5px 5px 5px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "5px", // Adjusted gap value
                    alignSelf: "stretch",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "white",
                      fontFamily: "Work Sans",
                      fontWeight: "bold",
                      fontSize: "30px",
                      lineHeight: "140%",
                    }}
                  >
                    {job.title}
                  </Typography>
                  <Typography
                    variant="Company"
                    color="textSecondary"
                    sx={{
                      fontFamily: "Work Sans, sans-serif",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    {job.companyName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      fontFamily: "Work Sans, sans-serif",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <span style={{ color: "#7A5FEC", fontSize: "11px" }}>
                      LOCATION
                    </span>
                    <br /> {job.location} {/* Added line break */}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{
                      fontFamily: "Work Sans, sans-serif",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    <span style={{ color: "#7A5FEC", fontSize: "11px" }}>
                      DATE
                    </span>
                    <br /> {job.datePosted} {/* Added line break */}
                  </Typography>
                </div>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default JobPosting;
