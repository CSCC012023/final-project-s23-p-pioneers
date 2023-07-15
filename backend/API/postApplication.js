const applicationSchema = require("../Schemas/applicationSchema");
const jobSchema = require("../Schemas/post");
const mongoose = require("mongoose");

const Application = mongoose.model("Application", applicationSchema);
const Job = mongoose.model("Job", jobSchema);

require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const addAssessment = async (req, res) => {
  try {
    const { code, score, username } = req.body;

    // Find the existing application document by username
    const application = await Application.findOne({ username });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const openai = new OpenAIApi(
      new Configuration({ apiKey: process.env.OPENAI_API_KEY })
    );

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that responds with just the Big O Complexity of given code",
        },
        {
          role: "user",
          content: `Can you respond back with only the characters of the complexity of the code: ${code}`,
        },
      ],
    });
    //Get GPT Response
    const complexity = response.data.choices[0].message.content;

    application.code = code;
    application.score = score;
    application.submissionTime = new Date();

    // Extract the complexity from the GPT response
    const complexityRegex = /O\([^\)]+\)/;
    const complexityMatch = complexity.match(complexityRegex);
    if (complexityMatch) {
      application.additionalFields.complexity = complexity;
    } else {
      application.additionalFields.complexity = "Unknown";
    }

    // Save the updated application to the database
    await application.save();

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

module.exports = { postApplication, addAssessment };
