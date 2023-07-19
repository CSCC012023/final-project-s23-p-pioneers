const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobId: String,
  title: String,
  location: String,
  jobDescription: String,
  deadline: {
    type: Date,
    required: true,
    default: Date.now,
  }, // Change to Date type
  companyName: String,
  datePosted: {
    type: Date,
    required: true,
    default: Date.now,
  }, // Change to Date type
  skills: [String], // Ensure skills is defined as an array of strings
  applicationIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Application",
  },
});

module.exports = jobSchema;
