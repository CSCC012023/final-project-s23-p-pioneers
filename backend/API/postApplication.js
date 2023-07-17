const applicationSchema = require("../Schemas/applicationSchema");
const jobSchema = require("../Schemas/post");
const mongoose = require("mongoose");
const userSignUpSchema = require("../Schemas/userSchema");

const Application = mongoose.model("Application", applicationSchema);
const Job = mongoose.model("Job", jobSchema);
const User = mongoose.model("User", userSignUpSchema);

const addAssessment = async (req, res) => {
  try {
    const { code, score, username } = req.body; // Extract the code, score, and username from the request body
    console.log(req.body);
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
    console.log(savedApplication);
    res.status(200).json({ message: "Assessment added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding assessment:", error);
    res.status(500).json({ error: "Failed to add assessment" });
  }
};

const postApplication = async (req, res) => {
  try {
    const { jobID, username } = req.body; // Extract the jobID, userID, and additionalFields from the request body

    // Check if the job exists
    const appliedJob = await Job.findOne({ jobId: jobID });

    if (!appliedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Create a new application document
    const newApplication = new Application({
      job: appliedJob._id,
      username: username,
    });

    appliedJob.applicationIds.push(newApplication._id);

    user.appliedJobsIds.push(appliedJob.jobId);

    await user.save();
    await appliedJob.save();
    // Save the application
    await newApplication.save();

    res.status(200).json({ success: true, message: "Application posted" });
  } catch (error) {
    // Handle errors
    console.error("Error posting application:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to post application" });
  }
};

module.exports = { postApplication, addAssessment };
