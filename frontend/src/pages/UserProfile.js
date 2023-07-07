import React from "react";
import { Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from '@mui/icons-material/Instagram';
import JobBox from "./components/JobBox";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  banner: {
    width: "100%",
    height: "200px",
    background: "linear-gradient(180deg, #8E24AA 0%, #673AB7 100%)",
    marginBottom: "30px",
    position: "relative",
  },
  userProfile: {
    display: "flex",
    width: "1073px",
    height: "500px",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    flexShrink: 0,
    borderRadius: "20px",
    padding: "20px",
    position: "relative",
    zIndex: 1,
    margin: "0 auto",
    // background: "#2B2B2B",
  },
  userImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: "40px",
  },
  userImage: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "50%",
    zIndex: "1",
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  userLabel: {
    color: "#8E24AA",
    fontWeight: 600,
  },
  userValue: {
    color: "white",
  },
  socialMedia: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  socialIcon: {
    color: "#8E24AA",
  },
  carousel: {
    flex: "3 0 75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "100px",
  },
  carouselButtons: {
    display: "flex",
    width: "1050px",
    justifyContent: "space-between",
  },
  carouselButton: {
    display: "flex",
    height: "60px",
    padding: "0px 30px",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    flex: "1 0 0",
    borderBottom: "2px solid var(--text, #FFF)",
    background: "linear-gradient(180deg, #3B3B3B 0%, rgba(59, 59, 59, 0.00) 100%)",
  },
  carouselContent: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    marginTop: "30px",
  },
  carouselButtonActive: {
    borderBottom: "2px solid blue",
  },
});

const UserProfile = () => {
  const classes = useStyles();
  const [selectedSection, setSelectedSection] = React.useState("Saved Jobs");

  // Job data for Saved Jobs
  const savedJobs = [
    {
      id: 1,
      companyName: "Tesla",
      positionName: "Software Engineer",
      location: "California, USA",
      type: "Full-time",
      imagePath: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/793px-Tesla_Motors.svg.png",
    },
    {
      id: 2,
      companyName: "Meta",
      positionName: "Automation Engineer",
      location: "California, USA",
      type: "Part-time",
      imagePath: "https://blog.logomyway.com/wp-content/uploads/2021/11/meta-logo.png",
    },
    {
        id: 3,
        companyName: "OpenAI",
        positionName: "ML Engineer",
        location: "California, USA",
        type: "Full-time",
        imagePath: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/OpenAI_Logo_%282%29.svg/2560px-OpenAI_Logo_%282%29.svg.png",
      },
      {
        id: 4,
        companyName: "Nvidia",
        positionName: "Cloud Engineer",
        location: "Seattle, USA",
        type: "Full-time",
        imagePath: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png",
      },
    // Add more job objects as needed
  ];

  // Job data for Applied Jobs
  const appliedJobs = [
    {
        id: 1,
        companyName: "OpenAI",
        positionName: "ML Engineer",
        location: "California, USA",
        type: "Full-time",
        imagePath: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/OpenAI_Logo_%282%29.svg/2560px-OpenAI_Logo_%282%29.svg.png",
      },
      {
        id: 2,
        companyName: "Tesla",
        positionName: "Software Engineer",
        location: "California, USA",
        type: "Full-time",
        imagePath: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/793px-Tesla_Motors.svg.png",
      },
      {
        id: 3,
        companyName: "Nvidia",
        positionName: "Cloud Engineer",
        location: "Seattle, USA",
        type: "Full-time",
        imagePath: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png",
      },
    // Add more job objects as needed
  ];

  const getJobBoxes = (jobs) => {
    return jobs.map((job) => <JobBox key={job.id} job={job} />);
  };

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <div className={classes.userImageContainer}>
          <img
            className={classes.userImage}
            alt="User Profile"
            src="https://i0.wp.com/mynintendonews.com/wp-content/uploads/2017/07/mario.jpg?resize=630%2C620&ssl=1"
          />
        </div>
        <Button 
        
        style = {{
            position: "fixed",
            top: "20px",
            left: "20px",
            borderRadius: "20px",
            background: "#A259FF",
            color: "white",
            width: "145px",
            height: "60px",
            padding: "0px 50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            zIndex: 2,
          }}

            endIcon={<EditIcon />}>
          Edit
        </Button>
      </div>
      <div className={classes.userProfile}>
        <div className={classes.userDetails}>
          <Typography variant="h4" className={classes.userLabel}>
            Name
          </Typography>
          <Typography variant="h3" className={classes.userValue}>
            Ansh Goatya
          </Typography>
          <div style={{ display: "flex", gap: "200px" }}>
            <div>
              <Typography variant="h4" className={classes.userLabel}>
                University
              </Typography>
              <Typography variant="h6" className={classes.userValue}>
                University of Toronto
              </Typography>
            </div>
            <div>
              <Typography variant="h4" className={classes.userLabel}>
                Program
              </Typography>
              <Typography variant="h6" className={classes.userValue}>
                Computer Science
              </Typography>
            </div>
            <div>
              <Typography variant="h4" className={classes.userLabel}>
                Email
              </Typography>
              <Typography variant="h6" className={classes.userValue}>
                ansh.goatya@mail.utoronto.ca
              </Typography>
            </div>
          </div>
          <Typography variant="h4" className={classes.userLabel}>
            Bio
          </Typography>
          <Typography variant="h5" className={classes.userValue}>
            I'm Him!!!!!
          </Typography>
          <Typography variant="h4" className={classes.userLabel}>
            Links
          </Typography>
          <div className={classes.socialMedia}>
          <GitHubIcon className={classes.socialIcon} />
          <LinkedInIcon className={classes.socialIcon} />
          <InstagramIcon className={classes.socialIcon} />
          </div>
        </div>
      </div>
      <div className={classes.carousel}>
        <div className={classes.carouselButtons}>



        <div
          className={`${classes.carouselButton} ${
            selectedSection === "Saved Jobs" ? classes.carouselButtonActive : ""
          }`}
          onClick={() => setSelectedSection("Saved Jobs")}
        >
          <Typography variant="h6">Saved Jobs</Typography>
        </div>
        <div
          className={`${classes.carouselButton} ${
            selectedSection === "Applied Jobs" ? classes.carouselButtonActive : ""
          }`}
          onClick={() => setSelectedSection("Applied Jobs")}
        >
          <Typography variant="h6">Applied Jobs</Typography>
        </div>
        
          <div className={classes.carouselButton}>
            <Typography variant="h6">Assessments</Typography>
          </div>
          <div className={classes.carouselButton}>
            <Typography variant="h6">Records</Typography>
          </div>
        </div>

        {selectedSection === "Saved Jobs" && (
          <div className={classes.carouselContent}>
            {getJobBoxes(savedJobs)}
          </div>
        )}
        {selectedSection === "Applied Jobs" && (
          <div className={classes.carouselContent}>
            {getJobBoxes(appliedJobs)}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserProfile;