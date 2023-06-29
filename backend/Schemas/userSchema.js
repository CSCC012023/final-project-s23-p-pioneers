const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
  },
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  // resume: {
  //   type: String,
  //   required: [true, "Please enter a resume"],
  // },
  // transcript: {
  //   type: String,
  //   required: [true, "Please enter a transcript"],
  // },
});

module.exports = signUpSchema;
