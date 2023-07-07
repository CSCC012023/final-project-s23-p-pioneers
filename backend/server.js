const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const assesmentApi = require('./API/assesments')
const getPost = require('./API/getpost')
const createPost = require('./API/createPost')
const userLogin = require("./API/loginUser");
const signUpRequest = require("./API/signUp.js");
const generateUploadURL = require("./s3.js");

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
app.get('/s3Url', async (req, res) => {
  console.log("heeere")

  try {
    const url = await generateUploadURL(req.query.username, req.query.type);
    res.send({ url });
    console.log(url);
  } catch (error) {
    console.error('Error generating upload URL:', error);
    res.status(500).send('Error generating upload URL');
  }
});

app.post('/createassesment', assesmentApi)
app.post("/createpost", createPost);

app.post('/getpost', getPost)


app.post("/login", userLogin);
app.post("/signup", signUpRequest);
