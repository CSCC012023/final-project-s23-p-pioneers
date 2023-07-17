const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobId: String,
  title: String,
  location: String,
  jobDescription: String,
  deadline: String,
  companyName: String,
  datePosted: String,
  skills: [String], // Ensure skills is defined as an array of strings
  applicationIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Application",
  },
});

module.exports = jobSchema;
