import React from "react";
import { Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import JobBox from "./components/JobBox";
import JobPosting from "./components/Card";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css"

import { useState, useEffect } from "react";

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
    gap: "50px",
    flexShrink: 0,
    borderRadius: "20px",
    padding: "20px",
    position: "relative",
    marginBottom: "25px",
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
    background:
      "linear-gradient(180deg, #3B3B3B 0%, rgba(59, 59, 59, 0.00) 100%)",
  },
  userLabelsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "100px",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "10px",
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

const RecruiterProfile = ({ userData }) => {
  const classes = useStyles();
//   const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = React.useState("Saved Jobs");

//   const fetchUserData = async () => {
//     try {
//       const username = localStorage.getItem("recruitername"); // Replace "exampleUser" with the actual username you want to retrieve

//       const response = await fetch("http://localhost:8000/getrecruiter", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username }),
//       });

//       const data = await response.json();
//       console.log(data);
//       setUserData(data.user); // Store the fetched user data in the state
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch user data when the component mounts
//     fetchUserData();
//   }, []);


  const getJobBoxes = (jobs) => {
    return jobs.map((job) => <JobBox key={job.id} job={job} />);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  console.log(userData);
  const {
    username,
    name,
    email,
    bio,
    profilepic,
    jobCategories,
    positionList,
    degrees,
    tags,
    description,
    location,
    logo,
  } = userData; // Assuming these fields exist in the fetched user data

  const handleEditClick = () => {
    navigate("/recruiterstep1")
  };
  
  const whiteCircleClass = classes.userImage + " white-circle";

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <div className={classes.userImageContainer}>
        {profilepic ? (
            <img
              className={classes.userImage}
              alt="User Profile"
              src={logo}
            />
          ) : (
            <div className={whiteCircleClass}></div>
          )}
        </div>
        <Button
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
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

            endIcon={<EditIcon />}
            onClick={handleEditClick}
            >
          Edit
        </Button>
      </div>
      <div className={classes.userProfile}>
        <div className={classes.userDetails}>
          <div className={classes.userLabelsContainer}>
            <div
              style={{
                background: "#3B3B3B",
                borderRadius: "20px",
                padding: "30px 30px 30px 30px",
                color: "white", // Added white text color
              }}
            >
              <Typography variant="h4" className="userLabel">
                <span style={{ fontWeight: "bold" }}>Name:</span>
              </Typography>
              <Typography variant="h6" className="userValue">
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "1.2rem",
                    marginTop: "3px",
                  }}
                >
                  {username}
                </span>
              </Typography>
            </div>
            <div
              style={{
                background: "#3B3B3B",
                borderRadius: "20px",
                padding: "30px 50px 30px 30px",
                color: "white", // Added white text color
              }}
            >
              <Typography variant="h4" className="userLabel">
                <span style={{ fontWeight: "bold" }}>Company:</span>
              </Typography>
              <Typography variant="h6" className="userValue">
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "1.2rem",
                    marginTop: "3px",
                  }}
                >
                    {name}
                </span>
              </Typography>
            </div>
            {/* <div
              style={{
                background: "#3B3B3B",
                borderRadius: "20px",
                padding: "30px 50px 30px 30px",
                color: "white", // Added white text color
              }}
            >
              <Typography variant="h4" className="userLabel">
                <span style={{ fontWeight: "bold" }}>Location:</span>
              </Typography>
              <Typography variant="h6" className="userValue">
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "1.2rem",
                    marginTop: "3px",
                  }}
                >
                    {location}
                </span>
              </Typography>
            </div>
            <div
              style={{
                background: "#3B3B3B",
                borderRadius: "20px",
                padding: "30px 50px 30px 30px",
                color: "white", // Added white text color
              }}
            >
              <Typography variant="h4" className="userLabel">
                <span style={{ fontWeight: "bold" }}>Company Description:</span>
              </Typography>
              <Typography variant="h6" className="userValue">
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "1.2rem",
                    marginTop: "3px",
                  }}
                >
                    {description}
                </span>
              </Typography>
            </div> */}
            <div
              style={{
                background: "#3B3B3B",
                borderRadius: "20px",
                padding: "30px 50px 30px 30px",
                color: "white", // Added white text color
                // paddingRight: "15px", // Added 15px padding to the right
              }}
            >
              <Typography variant="h4" className="userLabel">
                <span style={{ fontWeight: "bold" }}>Email:</span>
              </Typography>
              <Typography variant="h6" className="userValue">
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "1.2rem",
                    marginTop: "3px",
                  }}
                >
                  {email}
                </span>
              </Typography>
            </div>
          </div>

          <div
            style={{
              background: "#3B3B3B",
              borderRadius: "20px",
              padding: "20px 20px 20px 20px",
              marginBottom: "15px",
            }}
          >
            <Typography
              variant="h4"
              className={classes.userLabel}
              style={{ color: "white", fontWeight: "bold" }}
            >
              Bio
            </Typography>
            <div
              style={{
                background: "#2B2B2B",
                borderRadius: "20px",
                padding: "20px",
                marginTop: "10px",
              }}
            >
              <Typography
                variant="h5"
                className={classes.userValue}
                style={{ color: "white", fontWeight: "normal" }}
              >
                {bio}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={classes.carousel}>
        <div className={classes.carouselButtons}>
          <div
            className={`${classes.carouselButton} ${
              selectedSection === "Saved Jobs"
                ? classes.carouselButtonActive
                : ""
            }`}
            onClick={() => setSelectedSection("Saved Jobs")}
          >
            <Typography variant="h6">Saved Jobs</Typography>
          </div>
          <div
            className={`${classes.carouselButton} ${
              selectedSection === "Applied Jobs"
                ? classes.carouselButtonActive
                : ""
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
          <JobPosting prop={bookmarkedJobsIds} />
        )}
        {selectedSection === "Applied Jobs" && (
          <JobPosting prop={appliedJobsIds} />
        )}
      </div> */}
    </div>
  );
};

export default RecruiterProfile;
