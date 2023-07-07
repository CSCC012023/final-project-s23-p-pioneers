import React, { useState, useEffect } from "react";
import "./JobPosting.css";
import ApplicationDialog from "./components/ApplicationDialog";
import { useNavigate, useParams } from "react-router-dom";

function JobPosting() {
  const API_URL = "http://localhost:8000/getpost";

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
  //const [createdDate, setCreatedDate] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState([]);
  const [targetDate, setTargetDate] = useState();

  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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
        console.log(jobPostData[0].deadline);

        setPositionName(jobPostData[0].title);
        setCompanyName(jobPostData[0].companyName);
        //setCreatedDate(jobPostData[0].datePosted);
        setLocation(jobPostData[0].location);
        setDescription(jobPostData[0].jobDescription);
        setTags(jobPostData[0].skills);
        setTargetDate(jobPostData[0].deadline);
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

  const handleSubmitDialog = async () => {
    try {
      // console.log()
      const req = {
        jobID: id,
        username: localStorage.getItem('username'), // Replace with the actual userID
        additionalFields: {
          complexity: "O(nlog(n))",
          space: "O(n)",
          time: "10 mins",
        },
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
  };

  return (
    <div className="subcontent">
      <div className="content">
        <div className="side">
          <div className="cardclock">
            <div className="clockheading">Applications closes in:</div>
            <div className="timer">
              {formatTime(remainingTime.days)}d{" "}
              {formatTime(remainingTime.hours)}h{" "}
              {formatTime(remainingTime.minutes)}m{" "}
              {formatTime(remainingTime.seconds)}s
            </div>
            <button className="btntimer">Click</button>
            <button className="btntimer" onClick={handleOpenDialog}>
              Apply
            </button>
            <button className="btntimer" onClick={handleLeaderboardClick}>
              Leaderboard
            </button>
          </div>
          <div className="temp">
            <div className="position">{positionName}</div>
            <div className="company">{companyName}</div>
            {/* <div className="date">{createdDate}</div> */}
            <div className="details">Details</div>
            <div className="location">{location}</div>
          </div>
        </div>

        <div className="descriptionTitle">Description</div>
        <div className="descriptionText">{description}</div>

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
