const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
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
  bio: {
    type: String,
  },
  profilepic: {
    type: String,
  },
  jobCategories: {
    type: String,
  },
  positionList: {
    type: [String],
  },
  degrees: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    type: String,
  },
  jobs: {
    type: [String],
  }
});

module.exports = recruiterSchema;
