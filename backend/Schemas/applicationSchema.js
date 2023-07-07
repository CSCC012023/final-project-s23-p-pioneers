const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  username: {
    type: String,
    // ref: "user",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  submissionTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  codingQuestionResult: {
    type: String,
    enum: ["correct", "incorrect", "pending"],
    default: "pending",
  },
  code: {
    type: String, 
    
  },
  score: {
    type: String,
    default: 0,
  },
  additionalFields: {
    complexity: {
      type: String,
      required: true,
    },
    space: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  // Additional application-specific fields can be added here
});

module.exports = applicationSchema;
