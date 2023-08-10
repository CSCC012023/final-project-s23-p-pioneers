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

const updateParamsRecruiter = async (req, res) => {
  const username = req.body.username;
  const fieldToUpdate = req.body.field;
  const value = req.body.value;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user[fieldToUpdate] = value;

    await user.save();

    res.status(200).json({ message: "Field updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update field" });
  }
};

const setLogoRecruiter = async (req, res) => {
  const { username, link } = req.body;
  console.log(req.body);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: { logo: link } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update profile picture" });
  }
};

const getCompanyName = async (req, res) => {
  const { username } = req.query;
  const recruiter = await User.findOne({ username: username });
  console.log(recruiter.name);
  res.send({ name: recruiter.name });
};

const getCompanyLogo = async (req, res) => {
  const { username } = req.query;
  const recruiter = await User.findOne({ username: username });
  console.log(recruiter.logo);
  res.send({ logo: recruiter.logo });
};

const getRecruiter = async (req, res) => {
  const { username } = req.query;
  console.log(username);
  const recruiter = await User.findOne({ username: username });
  console.log(recruiter);
  res.send({ user: recruiter });
}
module.exports = {
  signUpEmployer,
  updateParamsRecruiter,
  setLogoRecruiter,
  getCompanyName,
  getCompanyLogo,
  getRecruiter,
};