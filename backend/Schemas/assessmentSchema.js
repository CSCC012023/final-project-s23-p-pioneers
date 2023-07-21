const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  assessmentId: String, 
  title: String,
  description: String,
  boilerCode: String, 
  code: String,
  testCases: [mongoose.Schema.Types.Mixed], // Use Mixed type for testCases

  exampleCases: String,
  datePosted: String,
  jobId: String,

});

module.exports = mongoose.model('Assessment', assessmentSchema);
