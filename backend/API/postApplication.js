const applicationSchema = require("../Schemas/applicationSchema");
const jobSchema = require("../Schemas/post");
const mongoose = require("mongoose");

const Application = mongoose.model("Application", applicationSchema);
const Job = mongoose.model("Job", jobSchema);

const postApplication = async (req, res) => {
  try {
    const { jobID, userID, additionalFields } = req.body; // Extract the jobID, userID, and additionalFields from the request body

    // Check if the job exists
    const appliedJob = await Job.findOne({ jobId: jobID });

    if (!appliedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Create a new application document
    const newApplication = new Application({
      job: appliedJob._id,
      user: userID,
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

module.exports = postApplication;
