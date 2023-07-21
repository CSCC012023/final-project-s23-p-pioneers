const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: String,
  title: String,
  location: String,
  jobDescription: String,
  deadline: String,
  companyName: String,
  datePosted: String,
  skills: [String], // Ensure skills is defined as an array of strings
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
});

  module.exports = jobSchema;