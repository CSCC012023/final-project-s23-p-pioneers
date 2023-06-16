const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  username: String,
  email: String,
  name: String,
  password: String,
  resume: String,
  transcript: String,
});

module.exports = signUpSchema;
