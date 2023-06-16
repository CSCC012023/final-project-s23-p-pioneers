const mongoose = require("mongoose");

const userLoginSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
});

const Login = mongoose.model("users", userLoginSchema);

const userLogin = async (req, res) => {
  try {
    const user = await Login.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) {
      return res.status(404).json({
        isValid: false,
        message: `Cannot find any user with the name ${req.body.username}`,
      });
    }

    res.json({ isValid: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

module.exports = userLogin;
