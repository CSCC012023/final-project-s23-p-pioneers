const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const short = require('short-uuid');

const Assessment = require('../Schemas/assessmentSchema');

const createAssessmentApi = async (req, res) => {
  try {
    // Extract the assessment data from the request body
    const { title, description, code, testCases, exampleCases, jobId } = req.body;
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
    });

    // Save the assessment to the database
    const savedAssessment = await newAssessment.save();

    // res.status(201).json({ message: 'Assessment created successfully', assessment: savedAssessment });
    res.json(savedAssessment);


  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = createAssessmentApi;
