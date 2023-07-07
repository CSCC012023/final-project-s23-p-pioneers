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
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  links: {
    type: [String],
  },
  jobCategories: {
    type: String,
  },
  positionList: {
    type: [String],
  },
});

module.exports = recruiterSchema;
