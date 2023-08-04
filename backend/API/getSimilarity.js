const stringSimilarity = require('string-similarity');
const mongoose = require("mongoose");
const jobSchema = require("../Schemas/post");
const Job = mongoose.model("Job", jobSchema);

const getSimilarityScore = async (req, res) => {
  const { jobid, text } = req.body;
  try {
    const jobPost = await Job.findOne({ jobId: jobid });

    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    // Extract the job description from the jobPost
    const jobDescription = jobPost.jobDescription;

    // Calculate the similarity score using the "compareTwoStrings" function
    const similarityScore = stringSimilarity.compareTwoStrings(text, jobDescription);

    // Return the similarity score in the response
    return res.status(200).json({ similarityScore });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = getSimilarityScore;