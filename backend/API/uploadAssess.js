const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const assessmentSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  exampleCases: [String],
  testCases: [{ input: String, output: String }]
});

const AssesmentModel = mongoose.model('assessment', assessmentSchema);

const createAssessment = async (req, res) => {
  try {
    const { jobId, title, description, exampleCases, testCases } = req.body;
    const assessment = new AssesmentModel({
      jobId,
      title,
      description,
      exampleCases,
      testCases
    });
    await assessment.save();
    res.status(201).json({ message: 'Assessment created successfully' });
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(500).json({ error: 'An error occurred while creating the assessment' });
  }
};

module.exports = { createAssessment };
