const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { assesmentAPI, compile } = require("./API/assesments");
const { followUser, unfollowUser, checkFollowStatus } = require("./API/followaction")
const getSimilarityScore = require("./API/getSimilarity");

const getPost = require("./API/getpost");
const {
  signUpEmployer,
  updateParamsRecruiter,
  setLogoRecruiter,
  getCompanyName,
  getCompanyLogo,
  getRecruiter,
} = require("./API/signupRecruiter");
const createPost = require("./API/createPost");
const verifyEmail = require("./API/postEmailVerification");
const searchusers = require("./API/searchusers")
const postBookmarkJob = require("./API/postBookmarkJob");
const removeBookmarkJob = require("./API/removeBookmarkJob");
const getUser = require("./API/getUser");

const getApplication = require("./API/getApplication");
const getApplicants = require("./API/applicants");

const {
  createAssessmentApi,
  getAssessmentApi,
} = require("./API/createAssessment");

const { userLogin, recruiterLogin} = require("./API/loginUser");

const {
  signUpRequest,
  setResume,
  setCoverLetter,
  setProfilePic,
  updateParams,
  addSkillsToUser,
  addGithubToUser,
  addLinkedinToUser,
} = require("./API/signUp.js");

const generateUploadURL = require("./s3.js");
const { postApplication, addAssessment } = require("./API/postApplication");

const getLeaderboard = require("./API/getLeaderboard");
const { remove } = require("lodash");

app.use(cors());
app.use(express.json()); // Add this line to parse JSON payloads

const uri =
  "mongodb+srv://cobuild:Password1234@cobuildcluster.n2ze2yv.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

connect();
app.listen(8000, () => {
  console.log("Server started on port 8000");
});

const logRequestResponse = (req, res, next) => {
  console.log("Request:", req.method, req.url, req.body); // Log request method, URL, and body
  const oldSend = res.send; // Store the original send method of the response

  // Override the send method to log the response daata
  res.send = function (data) {
    console.log("Response:", data); // Log the response data
    oldSend.call(this, data); // Call the original send method with the response data
  };

  next(); // Call the next middleware or route handler
};

app.use(logRequestResponse);
app.post("/resume", setResume);
app.post("/coverletter", setCoverLetter);
app.post("/profilepic", setProfilePic);
app.post("/update", updateParams);
app.post("/signuprecruiter", signUpEmployer);
app.post("/updaterecruiter", updateParamsRecruiter);
app.post("/setlogo", setLogoRecruiter);
app.post("/addcode", addAssessment);
app.post("/addskills", addSkillsToUser);
app.post("/addGithub", addGithubToUser);
app.post("/addLinkedin", addLinkedinToUser);
app.post("/getSimilarity", getSimilarityScore);

app.get("/getcompanyname", getCompanyName);
app.get("/getcompanylogo", getCompanyLogo);

app.get("/getrecruiter", getRecruiter);


app.post("/loginrecruiter", recruiterLogin);


app.post("/search", searchusers);
app.post("/followuser", followUser)
app.post("/loginrecruiter", recruiterLogin);
app.post("/checkfollowstatus",checkFollowStatus)
app.post("/unfollowuser", unfollowUser)
app.get("/s3Url", async (req, res) => {
  console.log("hello");

  try {
    const url = await generateUploadURL(
      req.query.username,
      req.query.type,
      req.query.extension
    );

    res.send({ url });
    const finalUrl = url.split("?")[0];
    console.log(finalUrl);

    // if (req.query.type === "resume") {
    //   console.log("resume detected")
    //   fetch('http://localhost:8000/resume', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ username: req.query.username, link: finalUrl }) // Fixed the JSON payload
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(`Resume updated successfully: ${data}`);
    //     })
    //     .catch(error => {
    //       console.error('Error updating resume:', error);
    //     });
    // } else if (req.query.type === "coverletter") {
    //   fetch('http://localhost:8000/coverletter', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ username: req.query.username, link: finalUrl }) // Fixed the JSON payload
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(`Cover letter updated successfully: ${data}`);
    //     })
    //     .catch(error => {
    //       console.error('Error updating cover letter:', error);
    //     });
    // } else if (req.query.type === "profilepic") {
    //   fetch('http://localhost:8000/profilepic', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ username: req.query.username, link: finalUrl }) // Fixed the JSON payload
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(`Profile picture updated successfully: ${data}`);
    //     })
    //     .catch(error => {
    //       console.error('Error updating profile picture:', error);
    //     });
    // }

    // res.status(200).json({ url: finalUrl });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    res.status(500).send("Error generating upload URL");
  }
});

app.post("/compile", compile);
app.post("/createassesment", assesmentAPI);
app.post("/createpost", createPost);

app.post("/getpost", getPost);

app.post("/login", userLogin);
app.post("/signup", signUpRequest);
app.post("/createassessment", createAssessmentApi);
app.post("/getassessment", getAssessmentApi);
app.post("/submitApplication", postApplication);
app.post("/leaderboard", getLeaderboard);
app.post("/verifyEmail", verifyEmail);

app.post("/bookmarkjob", postBookmarkJob);
app.post("/removebookmarkjob", removeBookmarkJob);
app.post("/getuser", getUser);
app.post("/getapplication", getApplication);
app.post("/getapplicants", getApplicants);