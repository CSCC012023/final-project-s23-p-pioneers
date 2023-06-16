const signUpSchema = require("../Schemas/userSignUpSchema");
const mongoose = require("mongoose");

const User = mongoose.model("user", signUpSchema);

const signUpRequest = async (req, res) => {
  const {
    username: username,
    email: email,
    name: name,
    password: password,
    resume: resume,
    transcript: transcript,
  } = req.body;

  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res.status(400).json({ eror: "Username already exists" });
  }

  const newUser = new User({
    username,
    email,
    name,
    password,
    resume,
    transcript,
  });

  newUser
    .save()
    .then(() => {
      // User saved successfully
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((error) => {
      // Error occurred while saving user
      res
        .status(500)
        .json({ error: "An error occurred while saving the user" });
    });
};

module.exports = signUpRequest;
