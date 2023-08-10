const applicationSchema = require("../Schemas/applicationSchema");
const mongoose = require("mongoose");

const Application = mongoose.model("Application", applicationSchema);

const getApplication = async (req, res) => {
  try {
    const { applicationId } = req.body;
    console.log(applicationId);
    if (!applicationId) {
      return res.status(400).json({ error: "Missing appID" });
    }

    const applications = await Application.findOne({
      applicationId: applicationId,
    });

    if (!applications) {
      return res.status(404).json({ error: "Application not found" });
    }
    console.log("testttt\n\n");
    console.log(applications);
    console.log("test\n\n\n\n");
    res.json(applications);
  } catch (error) {
    console.error("Error retrieving applications:", error);
    res.status(500).json({ error: "Failed to retrieve applications" });
  }
};

module.exports = getApplication;
