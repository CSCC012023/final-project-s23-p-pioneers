const recruiterSchema = require("../Schemas/recruiterSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.model("Recruiter", recruiterSchema);

const signUpEmployer = (req, res) => {
    console.log(req.body)
  const userData = req.body;

  // Create a new document using the signUpSchema
  const user = new User(userData);

  // Save the user to the database
  user
    .save()
    .then(() => {
      res.status(201).json({ message: "User saved successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred while saving the user" });
    });
};

module.exports = signUpEmployer;
