const signUpSchema = require("../Schemas/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.model("user", signUpSchema);

const validate = (data) => {
  const errors = {};

  // Check if username is provided
  if (!data.username) {
    errors.username = "Username is required";
  } else {
    // Check username length
    if (data.username.length < 3 || data.username.length > 20) {
      errors.username = "Username must be between 3 and 20 characters";
    }
  }

  // Check if password is provided
  if (!data.password) {
    errors.password = "Password is required";
  } else {
    // Check password validity
    if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  // Check if email is provided
  if (!data.email) {
    errors.email = "Email is required";
  } else {
    // Check email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "Invalid email format";
    }
  }

  // Check if name is provided
  if (!data.name) {
    errors.name = "Name is required";
  } else {
    // Check name length
    if (data.name.length < 2 || data.name.length > 50) {
      errors.name = "Name must be between 2 and 50 characters";
    }
  }

  return errors;
};

const signUpRequest = async (req, res) => {
  const {
    username: username,
    email: email,
    name: name,
    password: password,
    // resume: resume,
    // transcript: transcript,
  } = req.body;

  // Validate the input data
  const validationErrors = validate(req.body);
  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Hash the password
  // 10 is the salt rounds, which determines the hashing complexity
  const hashedPassword = await bcrypt.hash(password, 10);

  // Need to add resume and transcript when sending to s3
  const newUser = new User({
    username,
    email,
    name,
    password: hashedPassword,
    // resume,
    // transcript,
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
