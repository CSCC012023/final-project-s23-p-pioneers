const applicationSchema = require("../Schemas/applicationSchema");
const mongoose = require("mongoose");

const Application = mongoose.model("Application", applicationSchema);

const getApplication = async (req, res) => {
  try {
    const { username, jobID } = req.body;

    if (!username || !jobID) {
      return res.status(400).json({ error: "Missing username or jobID" });
    }

    const applications = await Application.findOne({
      username: username,
      jobId: jobID,
    });

    if (!applications) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json(applications);
  } catch (error) {
    console.error("Error retrieving applications:", error);
    res.status(500).json({ error: "Failed to retrieve applications" });
  }
};

module.exports = getApplication;
