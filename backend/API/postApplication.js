const applicationSchema = require("../Schemas/applicationSchema");
const jobSchema = require("../Schemas/post");
const mongoose = require("mongoose");
const signUpSchema = require("../Schemas/userSchema");
const short = require('short-uuid');

const Application = mongoose.model("Application", applicationSchema);
const Job = mongoose.model("Job", jobSchema);
const User = mongoose.model("User", signUpSchema);
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const addAssessment = async (req, res) => {
  try {
    const { username, codingQuestionResult, jobId } = req.body;

    // Find the existing application document by username
    console.log("username", username, "jobId", jobId);

    const application = await Application.findOne({
      username: username,
      jobId: jobId,
    });

    // Find the application that matches the requested jobID

    // user.applicatioIds.map((application) => (application))

    // const applicatioIds =
    // const application = await Application.findOne({ username });

    // if (!application) {
    //   return res.status(404).json({ error: "Application not found" });
    // }
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
          content: `Can you respond back with only the characters of the complexity of the code: ${codingQuestionResult.code}`,
        },
      ],
    });
    //Get GPT Response
    const complexity = response.data.choices[0].message.content;

    application.codingQuestionResult.code = codingQuestionResult.code;
    application.codingQuestionResult.score = codingQuestionResult.score;
    application.codingQuestionResult.time = "15";
    application.submissionTime = new Date();
    application.codingQuestionStatus = "done";
    console.log('andrew')
    if (!application.codingQuestionResultArray) {
      application.codingQuestionResultArray = [];
    }
    application.codingQuestionResultArray.push({
      code: codingQuestionResult.code,
      score: codingQuestionResult.score,
      complexity: complexity,
      time: new Date().toString(),
    });
    // Extract the complexity from the GPT response
    const complexityRegex = /O\([^\)]+\)/;
    const complexityMatch = complexity.match(complexityRegex);
    if (complexityMatch) {
      application.codingQuestionResult.complexity = complexity;
    } else {
      application.codingQuestionResult.complexity = "Unknown";
    }

    // Save the updated application to the database
    await application.save();

    res.status(200).json({ message: "Assessment added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error adding assessment:", error);
    res.status(200).json({ error: "Failed to add assessment" });
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
      applicationId: short.generate(),
      job: appliedJob._id,
      jobId: jobID,
      username: username,
      resumeScore: (Math.floor(Math.random() * (80 - 40 + 1)) + 40).toString(),
    });

    appliedJob.applicationIds.push(newApplication._id);

    user.appliedJobsIds.push(appliedJob._id);

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
