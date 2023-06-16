const userLoginSchema = require("../Schemas/userSignInSchema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Login = mongoose.model("users", userLoginSchema);

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

    const user = await Login.findOne({ username, password });

    if (!user) {
      return res.status(404).json({
        isValid: false,
        message: `Cannot find any user with the name ${username} and given password`,
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

module.exports = userLogin;
