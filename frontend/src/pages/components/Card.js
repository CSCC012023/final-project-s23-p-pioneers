import React from 'react';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { Container, Grid, Box, Typography } from '@mui/material';
import '../JobPosting.css'; // Import custom CSS file for styling
import { useNavigate } from 'react-router-dom';


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
    navigate('/jobpost/' + jobId);
    
  };
  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      {/* Adjust the maxWidth value as per your design */}
      <Grid container spacing={2}>
        {jobs.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No job postings from this company</Typography>
          </Grid>
        ) : (
          jobs.map((job, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} onClick={() => handleClick(job.jobId)}
            >
              <Box
                sx={{
                  padding: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 4,
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <img
                  src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png'}
                  alt={job.title}
                  style={{
                    width: '100%',
                    height: '295px', // Adjust as needed
                    objectFit: 'cover',
                  }}
                />

                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'white',
                    fontFamily: 'Work Sans',
                    fontStyle: 'Sans Serif',
                    fontWeight: 600,
                    fontSize: '22px',
                    lineHeight: '140%',
                  }}
                >
                  {job.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontFamily: 'Work Sans, sans-serif',
                    color: 'white',
                  }}
                >
                  {`${job.companyName} • ${job.location} • ${job.datePosted}`}
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
