// removeBookmarkJob.js

const mongoose = require("mongoose");
const signUpSchema = require("../Schemas/userSchema");
const jobSchema = require("../Schemas/post");

const User = mongoose.model("users", signUpSchema);
const Job = mongoose.model("Job", jobSchema);

// Assuming you have already defined the User model and imported the required modules

const removeBookmarkJob = async (req, res) => {
    try {
      const { username, jobId } = req.body;
  
      if (!username || !jobId) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Convert jobId to string before removing from bookmarkedJobsIds array
      const jobIdAsString = jobId.toString();
  
      if (!user.bookmarkedJobsIds.includes(jobIdAsString)) {
        return res.status(404).json({ error: "Job not bookmarked by the user" });
      }
  
      // Remove the jobId from the bookmarkedJobsIds array
      user.bookmarkedJobsIds = user.bookmarkedJobsIds.filter(
        (id) => id !== jobIdAsString
      );
  
      await user.save();
  
      res.json({ message: "Bookmark removed successfully", userInfo: user });
    } catch (error) {
      console.error("Error removing bookmark:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  module.exports = removeBookmarkJob;
  