const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const CodeExecutionStrategy = require("../CodeExecutionStrategy");
const PythonExecutionStrategy = require("../PythonExecutionStrategy");
const CodeExecutionContext = require("../AssesmentCodeCompilation");

const { PythonShell } = require("python-shell");
const _ = require('lodash');

// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const assessmentSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  // image: { data: Buffer },
  exampleCases: [String],
  testCases: [
    { input: mongoose.Schema.Types.Mixed, output: mongoose.Schema.Types.Mixed },
  ],
});

// Create the user model
const AssesmentModel = mongoose.model("assessments", assessmentSchema);

// API endpoint to handle the POST request
assesmentAPI = (req, res) => {
  const { postid, title, description, exampleCases, testCases } = req.body;
  const assesmentUUID = uuidv4();
  //console.log(assesmentUUID);

  // Create a new user instance
  const newAssesment = new AssesmentModel({
    postid,
    title,
    description,
    exampleCases,
    testCases: testCases,
    // image,
    // exampleCases,
    // testCases
  });

  newAssesment
    .save()
    .then(() => {
      // User saved successfully
      res.status(201).json({ message: "newAssesment created successfully" });
    })
    .catch((error) => {
      // Error occurred while saving user
      res
        .status(500)
        .json({ error: "An error occurred while saving the newAssesment" });
    });
};

compile = async (req, res) => {
  try {
    const { pythonCode, tests } = req.body;
    console.log(tests)
    let score = 0

    for (const test of tests) {
      console.log(test)
      // Execute the code using the PythonShell library
      const options = {
          mode: 'text',
          pythonOptions: ['-u'], // get print results in real-time
          args: [JSON.stringify(test.Input), JSON.stringify(test.Output)],
      };
      
      // console.log('Executing Python code for input:', input);
      // console.log(code);
      const messages = await PythonShell.runString(pythonCode, options);
      if (messages[messages.length - 1] == "Test Passed!") {
        score = score + 1
      }

      // const result = messages[-1]; // Access the first element of the messages array

      // if (result === expectedResult.toString()) {
      //   testResults.push(result);
      //   // console.log('Correct');
      // }

    }
    score = (score / tests.length) * 100.0;

    res.json({ score })
    // return res.status(200).json({ result: results });
  } catch (error) {
    console.error("Error in compile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { assesmentAPI, compile };