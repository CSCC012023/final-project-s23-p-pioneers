const applicationSchema = require("../Schemas/applicationSchema");
const jobSchema = require("../Schemas/post");
const mongoose = require("mongoose");

const Application = mongoose.model("Application", applicationSchema);
const Job = mongoose.model("Job", jobSchema);


const addAssessment = async (req, res) => {
  try {
    const { code, score, username } = req.body; // Extract the code, score, and username from the request body
    console.log(req.body)
    // Find the existing application document by username
    const application = await Application.findOne({ username });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update the code and score if they are empty
    application.code = code;
  

    application.score = score;
    

    // Save the updated application to the database
    const savedApplication = await application.save();
    console.log(savedApplication)
    res.status(200).json({ message: "Assessment added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding assessment:", error);
    res.status(500).json({ error: "Failed to add assessment" });
  }
};

const postApplication = async (req, res) => {
  try {
    const { jobID, username, additionalFields } = req.body; // Extract the jobID, userID, and additionalFields from the request body

    // Check if the job exists
    const appliedJob = await Job.findOne({ jobId: jobID });

    if (!appliedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Create a new application document
    const newApplication = new Application({
      job: appliedJob._id,
      username: username,
      additionalFields,
    });

    // Save the application
    await newApplication.save();

    res.status(200).json({ success: true });
  } catch (error) {
    // Handle errors
    console.error("Error posting application:", error);
    res.status(500).json({ error: "Failed to post application" });
  }
};

module.exports = {postApplication, addAssessment};
