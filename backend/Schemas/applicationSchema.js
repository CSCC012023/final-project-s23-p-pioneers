const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  jobId: {
    type: String,
  },
  submissionTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  codingQuestionStatus: {
    type: String,
    enum: ["done", "pending"],
    default: "pending",
  },
  codingQuestionResult: {
    code: {
      type: String,
    },
    score: {
      type: String,
      default: 0,
    },
    complexity: {
      type: String,
      default: "Unknown",
    },
    time: {
      type: String,
      default: "Unknown",
    },
  },
});

module.exports = applicationSchema;
