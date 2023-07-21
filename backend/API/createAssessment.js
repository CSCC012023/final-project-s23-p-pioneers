const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const short = require('short-uuid');

const Assessment = require('../Schemas/assessmentSchema');

const jobSchema = require('../Schemas/post')


const Job = mongoose.model('Job', jobSchema);

const createAssessmentApi = async (req, res) => {
  try {
    // Extract the assessment data from the request body
    const { title, description, code, testCases, exampleCases, jobId, boilerCode } = req.body;
    const datePosted = new Date().toISOString(); // Add this line to get the current date and time in ISO format

    // Create the assessment object
    const newAssessment = new Assessment({
      assessmentId: short.generate(),
      title,
      description,
      code,
      testCases,
      exampleCases,
      datePosted,
      jobId,
      boilerCode,
    });
    console.log("jobId", jobId)

    const job = await Job.findOne({ jobId: jobId });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update the 'isAssessment' property of the job document or set it to true if not present
    job.isAssessment = true;
    await job.save();
    // Save the assessment to the database
    const savedAssessment = await newAssessment.save();

    // res.status(201).json({ message: 'Assessment created successfully', assessment: savedAssessment });
    res.json(savedAssessment);


  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAssessmentApi = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: 'Please provide either jobId or assessmentId' });
    }

    let query;
    if (jobId) {
      query = { jobId };
    }

    // Find the assessment based on the provided query
    const assessment = await Assessment.find({ jobId: jobId });

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    res.json(assessment[0]);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createAssessmentApi, getAssessmentApi };

