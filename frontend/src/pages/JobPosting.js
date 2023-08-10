import React, { useState, useEffect } from "react";
import "./JobPosting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiTrophy, BiGlobe } from "react-icons/bi";

import ApplicationDialog from "./components/ApplicationDialog";
import { useNavigate, useParams } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";

library.add(faBookmarkRegular, faBookmarkSolid);

function JobPosting() {
  const API_URL = "http://localhost:8000/getpost";

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    try {
      const req = {
        username: localStorage.getItem("username"),
        jobId: id,
      };

      const response = await fetch("http://localhost:8000/bookmarkjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      if (response.ok) {
        console.log("Job bookmarked successfully");
        setIsBookmarked(true); // Always set the local state to true when bookmarked
        // Save the bookmarked state in localStorage
        localStorage.setItem("bookmark_" + id, "true");
      } else {
        console.error("Failed to bookmark the job");
      }
    } catch (error) {
      console.error("Error bookmarking the job:", error);
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      const req = {
        username: localStorage.getItem("username"),
        jobId: id,
      };

      const response = await fetch("http://localhost:8000/removebookmarkjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      if (response.ok) {
        console.log("Bookmark removed successfully");
        setIsBookmarked(false); // Always set the local state to false when removed
        // Remove the bookmarked state from localStorage
        localStorage.removeItem("bookmark_" + id);
      } else {
        console.error("Failed to remove bookmark");
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      handleRemoveBookmark();
    } else {
      handleBookmark();
    }
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const handleLeaderboardClick = () => {
    navigate(`/leaderboard/${id}`);
  };

  const calculateTimeRemaining = (targetDate) => {
    const timeDiff = new Date(targetDate) - new Date();
    const seconds = Math.floor(timeDiff / 1000);

    if (seconds <= 0) {
      // Timer has reached or passed the target date
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return { days, hours, minutes, seconds: remainingSeconds };
  };

  const formatTime = (time) => {
    return `${time < 10 ? "0" : ""}${time}`;
  };

  const [positionName, setPositionName] = useState();
  const [companyName, setCompanyName] = useState();
  const [createdDate, setCreatedDate] = useState();
  const [companyLogo, setLogo] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState([]);
  const [targetDate, setTargetDate] = useState();
  const [isAssessmemnt, setIsAssessmemnt] = useState(false)

  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const isDeadlinePassed =
    remainingTime.days <= 0 &&
    remainingTime.hours <= 0 &&
    remainingTime.minutes <= 0 &&
    remainingTime.seconds <= 0;

  useEffect(() => {
    setRemainingTime(calculateTimeRemaining(targetDate));

    const timerId = setInterval(() => {
      setRemainingTime(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [targetDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });

        const jobPostData = await response.json();
        console.log(jobPostData[0])
        console.log(jobPostData[0].deadline);

        setPositionName(jobPostData[0].title);
        setCompanyName(jobPostData[0].companyName);
        setCreatedDate(jobPostData[0].datePosted);
        setLocation(jobPostData[0].location);
        setDescription(jobPostData[0].jobDescription);
        setTags(jobPostData[0].skills);
        setTargetDate(jobPostData[0].deadline);
        setIsAssessmemnt(jobPostData[0].isAssessment);
        setLogo(jobPostData[0].companyLogo);

        const bookmarked = localStorage.getItem("bookmark_" + id);
        if (bookmarked === "true") {
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }
      } catch (error) {
        console.error("Error fetching job post:", error);
      }
    };

    fetchData();
  }, [id]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

  const handleSubmitDialog = async () => {
    try {
      // console.log()
      const req = {
        jobID: id,
        username: localStorage.getItem("username"), // Replace with the actual userID
      };

      const response = await fetch("http://localhost:8000/submitApplication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      // Handle the response from the server
      if (response.ok) {
        // Application submitted successfully
        console.log("Application submitted successfully");
        // Perform any necessary actions or show a success message
      } else {
        // Application submission failed
        console.error("Failed to submit application");
        // Handle the error or show an error message
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("Error submitting application:", error);
      // Show an error message to the user
    }
    setOpenDialog(false);
    navigate("/assess/" + id)

  };
  const descriptionHeight = description ? description.split('\n').length * 20 : 0; // Adjust the factor (20) based on your design

  return (
    <div className="subcontent">
      <div
        style={{
          justifyContent: "center",
          width: "100%",
          marginLeft: "20%",
          marginRight: "20%",
          height: "100%",
          paddingBottom: "50px",
        }}
      >
        <div className="cardclock">
          {isDeadlinePassed ? (
            <div className="timer">Deadline Passed</div>
          ) : (
            <>
              <div className="clockheading">Applications closes in:</div>

              <div className="timer">
                {formatTime(remainingTime.days)}d{" "}
                {formatTime(remainingTime.hours)}h{" "}
                {formatTime(remainingTime.minutes)}m{" "}
                {formatTime(remainingTime.seconds)}s
              </div>
            </>
          )}

          <div className="centered">
            {!isDeadlinePassed && (
              <button className="btntimer applybtn" onClick={handleOpenDialog}>
                Apply
              </button>
            )}
            <div className="centered bookmark">
              {!isDeadlinePassed && (
                <FontAwesomeIcon
                  icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
                  style={{ color: "#A259FF" }}
                  onClick={toggleBookmark}
                  className={`bookmark-icon ${
                    isBookmarked ? "bookmarked" : ""
                  }`}
                />
              )}
            </div>
          </div>
          <button className="btntimer leadbtn" onClick={handleLeaderboardClick}>
            Leaderboard &nbsp;
            <BiTrophy />
          </button>
        </div>
        <div className="temp">
        <div>
            {companyLogo && (
              <img
                src={companyLogo}
                style={{ height : "200px", marginBottom: "40px" }}
              />
              )}
          </div>
          <div className="position">{positionName}</div>
          <div className="company">{companyName}</div>
          <div className="date">Created on {formatDate(createdDate)}</div>
          <div className="details">Details</div>
          <div className="location">
            <BiGlobe size={19} />
            &nbsp;{location}
          </div>
        </div>

        <div className="descriptionTitle">Description</div>
        <div className="descriptionText">
          {description}
        </div>
        <div className="tags">Tags</div>
        <div className="tagelements">
          {tags.map((name) => (
            <button className="btnss" key={name}>
              {name}
            </button>
          ))}
        </div>
      </div>
      <ApplicationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        submit={handleSubmitDialog}
        job={positionName}
        company={companyName}
      />
    </div>
  );
}

export default JobPosting;