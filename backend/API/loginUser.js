const signUpSchema = require("../Schemas/userSchema");
const recruiterSchema = require("../Schemas/recruiterSchema");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const Login = mongoose.model("users", signUpSchema);
const Recruiter = mongoose.model("Recruiter", recruiterSchema);


const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({
        isValid: false,
        message: "Username and password are required",
      });
    }

    const user = await Login.findOne({ username });

    if (!user) {
      return res.status(404).json({
        isValid: false,
        message: `Cannot find any user with the name ${username} and given password`,
      });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        isValid: false,
        message: `Cannot find any user with the name ${username} and given password`,
      });
    }

    if (user.verification.verified === false) {
      return res.status(401).json({
        isValid: false,
        message: `Please verify your email`,
      });
    }

    const payload = {
      username: user.username,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

    res.json({
      isValid: true,
      message: "Login successful",
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

const recruiterLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({
        isLoggedIn: false,
        message: "Username and password are required",
      });
    }

    const user = await Recruiter.findOne({ username });

    if (!user) {
      return res.json({
        isLoggedIn: false,
        message: "User is not logged in",
      });
    }

    const passwordMatch = password === user.password;

    if (passwordMatch) {
      return res.json({
        isLoggedIn: true,
        message: "User is logged in",
      });
    } else {
      return res.json({
        isLoggedIn: false,
        message: "User is not logged in",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  }
}


module.exports = { userLogin, recruiterLogin}
