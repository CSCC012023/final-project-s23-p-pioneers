const applicationSchema = require("../Schemas/applicationSchema");
const jobSchema = require("../Schemas/post");
const mongoose = require("mongoose");

const Application = mongoose.model("Application", applicationSchema);
const Job = mongoose.model("Job", jobSchema);

const getApplicants = async (req, res) => {
  try {
    const { jobID, days } = req.body; // Extract the jobID and days from the request body

    // Find the job document by the jobId field
    const appliedJob = await Job.findOne({ jobId: jobID });

    if (!appliedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Calculate the date that is `days` ago
    const date = new Date();
    date.setDate(date.getDate() - days);

    // Retrieve applications for the specified job with submissionTime less than the calculated date
    const applications = await Application.find({
      job: appliedJob._id,
      submissionTime: { $gte: date }, // Filter applications with submissionTime greater than or equal to the calculated date
      codingQuestionStatus: "done",
    })
      .sort({
        score: -1,
        "codingQuestionResult.complexity": 1,
        "codingQuestionResult.time": -1,
      })

    // Send the applications as a response
    console.log("applications", applications)
    res.json(applications);
  } catch (error) {
    // Handle errors
    console.error("Error retrieving applications:", error);
    res.status(500).json({ error: "Failed to retrieve applications" });
  }
};

module.exports = getApplicants;
