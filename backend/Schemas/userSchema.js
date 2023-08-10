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
  skills: [
    {
      type: String,
      required: false,
    },
  ],
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
  appliedJobsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Reference the jobSchema
    },
  ],
  assessmentIds: {
    type: [String],
    required: false,
  },
  verification: {
    verified: {
      type: Boolean,
      required: false,
    },
    uniqueString: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
  },
  bookmarkedJobsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Reference the jobSchema
    },
  ],
  resume: {
    type: String,
    required: false,
  },
  transcript: {
    type: String,
    required: false,
  },
  isFirstTime: {
    type: Boolean,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
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
  followers: [String],
  following: [String],
});

module.exports = signUpSchema;
