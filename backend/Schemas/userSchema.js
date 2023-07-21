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
  bio: {
    type: String,
    required: false,
  },
  skills: [{
    type: String,
    required: false,
  }],
  courses: {
    type: [String],
    required: false,
  },
  resume: {
    type: String,
    required: false,
  },
  coverletter: {
    type: String,
    required: false,
  },
  profilepic: {
    type: String,
    required: false,
  },
  university: {
    type: String,
    required: false,
  },
  program: {
    type: String, 
    required: false,
  }, 
  savedJobIds: {
    type: [String],
    required: false,
  },
  appliedJobsIds: {
    type: [String],
    required: false,
  },
  assessmentIds: {
    type: [String],
    required: false,
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
