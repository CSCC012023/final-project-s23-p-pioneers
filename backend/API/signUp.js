const signUpSchema = require("../Schemas/userSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const mailgen = require("mailgen");
const EdenaiAPIParserStrategy = require("../EdenaiAPIParserStrategy")

require("dotenv").config();

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

const setResume = async (req, res) => {
  const { username, link } = req.body;
  console.log(req.body);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: { resume: link } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update resume" });
  }
};

const setCoverLetter = async (req, res) => {
  const { username, link } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: { coverletter: link } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cover letter" });
  }
};


const updateParams = async (req, res) => {
  const username = req.body.username;
  const fieldToUpdate = req.body.field;
  const value = req.body.value;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (fieldToUpdate === "skills") {
      // Handle skills field separately as an array
      user.skills = Array.isArray(value) ? value : [value];
    } 
    else if (fieldToUpdate === "resume") {
      user[fieldToUpdate] = value;
      const edenaiAPIParser = new EdenaiAPIParserStrategy();
      edenaiAPIParser.parseResume(value, username);
    }
    else {
      // Handle other fields normally
      user[fieldToUpdate] = value;
    }

    await user.save();

    res.status(200).json({ message: "Field updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update field" });
  }
};

const setProfilePic = async (req, res) => {
  const { username, link } = req.body;
  console.log(req.body);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $set: { profilepic: link } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update profile picture" });
  }
};

const sendVerificationEmail = async ({ _id, email, username }, res) => {
  const currentUrl = "http://localhost:3000";

  const uniqueString = uuidv4() + _id;

  let MailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "CoBuild",
      link: `${currentUrl}/login`,
    },
  });

  let response = {
    body: {
      name: username,
      intro: "Welcome to CoBuild! We're very excited to have you on board.",
      action: {
        instructions:
          "To get started with CoBuild, please verify your account here, this link will expire in 6 hours:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: `${currentUrl}/verfication/${uniqueString}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let mail = MailGenerator.generate(response);

  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Please verify your email",
    html: mail,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  // hash the uniqueString and save it to the database

  const updateUser = await User.findById(_id);

  updateUser.verification.uniqueString = uniqueString;
  updateUser.verification.createdAt = Date.now();
  updateUser.verification.expiresAt = Date.now() + 21600000;
  updateUser.verification.verified = false;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to send verification email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent" });
    }
  });
  await updateUser.save();
};
// Verify email

const signUpRequest = async (req, res) => {
  const {
    username: username,
    email: email,
    name: name,
    password: password,
    // resume: resume,
    // transcript: transcript,
  } = req.body;

  const url = "https://api.chatengine.io/users/";
  const privateKey = "e9cddeb1-93b9-43fd-ac8c-8dd75adc6bb2";

  const userData = {
    username: username,
    first_name: name,
    secret: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "PRIVATE-KEY": privateKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
    })
    .catch((error) => {
      console.error("User Already Registered:", error);
    });

  // console.log(req)
  // Validate the input data
  // const validationErrors = validate(req.body);
  // if (Object.keys(validationErrors).length > 0) {
  //   return res.status(400).json({ errors: validationErrors });
  // }

  // const existingEmail = await User.findOne({ email: email });
  // if (existingEmail) {
  //   return res.status(400).json({ error: "Email already exists" });
  // }

  // const existingUser = await User.findOne({ username: username });
  // if (existingUser) {
  //   return res.status(400).json({ error: "Username already exists" });
  // }

  // Hash the password
  // 10 is the salt rounds, which determines the hashing complexity
  const hashedPassword = await bcrypt.hash(password, 10);

  // Need to add resume and transcript when sending to s3
  const newUser = new User({
    username,
    email,
    name,
    password: hashedPassword,
    verified: false,
    // resume,
    // transcript,
  });

  newUser
    .save()
    .then((result) => {
      sendVerificationEmail(result, res);
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

const addSkillsToUser = async (req, res) => {
  const { username } = req.body;
  const { newSkills } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!Array.isArray(newSkills)) {
      return res.status(400).json({ error: "New skills must be provided as an array" });
    }

    // Remove duplicates and add new skills to the existing skills array
    const uniqueNewSkills = [...new Set(newSkills)];
    user.skills.push(...uniqueNewSkills);

    await user.save();

    res.status(200).json({ message: "Skills added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add skills" });
  }
};

const addGithubToUser = async (req, res) => {
const { username, github } = req.body;

try {
  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the user's GitHub link
  user.github = github;


  // Save the updated user
  await user.save();

  res.status(200).json({ message: "GitHub link added successfully" });
} catch (error) {
  res.status(500).json({ error: "Failed to add GitHub link" });
}
};

const addLinkedinToUser = async (req, res) => {
const { username, linkedin } = req.body;

try {
  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the user's LinkedIn link
  user.linkedin = linkedin;

  // Save the updated user
  await user.save();

  res.status(200).json({ message: "LinkedIn link added successfully" });
} catch (error) {
  res.status(500).json({ error: "Failed to add LinkedIn link" });
}
};

module.exports = {
  signUpRequest,
  setResume,
  setCoverLetter,
  setProfilePic,
  updateParams,
  addSkillsToUser,
  addGithubToUser,
  addLinkedinToUser,
};