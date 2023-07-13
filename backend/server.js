const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { assesmentAPI, compile } = require('./API/assesments')
const getPost = require('./API/getpost')
const signUpEmployer = require('./API/signupRecruiter')
const createPost = require('./API/createPost')

const userLogin = require("./API/loginUser");
const {
  signUpRequest,
  setResume,
  setCoverLetter,
  setProfilePic,
  updateParams
} = require("./API/signUp.js");


const generateUploadURL = require("./s3.js");
const { postApplication, addAssessment }  = require("./API/postApplication");

const getLeaderboard = require("./API/getLeaderboard");

app.use(cors());
app.use(express.json()); // Add this line to parse JSON payloads

const uri =
  "mongodb+srv://cobuild:Password1234@cobuildcluster.n2ze2yv.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Vikram");
  } catch (error) {
    console.log(error);
  }
}

connect();
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
app.post("/resume", setResume);
app.post("/coverletter", setCoverLetter);
app.post("/profilepic", setProfilePic);
app.post("/update", updateParams);
app.post("/signuprecruiter", signUpEmployer)
app.post("/addcode", addAssessment)

app.get('/s3Url', async (req, res) => {
  console.log("hello")

  try {
    const url = await generateUploadURL(req.query.username, req.query.type, req.query.extension);

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
    console.error('Error generating upload URL:', error);
    res.status(500).send('Error generating upload URL');
  }
});

app.post('/compile', compile)
app.post('/createassesment', assesmentAPI)
app.post("/createpost", createPost);

app.post("/getpost", getPost);

app.post("/login", userLogin);
app.post("/signup", signUpRequest);


app.post("/submitApplication", postApplication);
app.post("/leaderboard", getLeaderboard);
