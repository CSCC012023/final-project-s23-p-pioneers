const mongoose = require("mongoose");
const signUpSchema = require("../Schemas/userSchema");
const jobSchema = require("../Schemas/post");

const User = mongoose.model("users", signUpSchema);
const Job = mongoose.model("Job", jobSchema);

const removeBookmarkJob = async (req, res) => {
  try {
    const { username, jobId } = req.body;

    if (!username || !jobId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({ username })
        .populate("bookmarkedJobsIds")


    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(user)

    const job = await Job.findOne({ jobId });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Validate if jobId is a valid ObjectId
   

    // Convert jobId to a MongoDB ObjectId

    // Check if the jobId exists in the bookmarkedJobsIds array
    const jobIndex = user.bookmarkedJobsIds.findIndex((bookmark) => bookmark.jobId === jobId);

    if (jobIndex === -1) {
      return res.status(404).json({ error: "Job not bookmarked by the user" });
    }

    // Remove the job object from the bookmarkedJobsIds array
    user.bookmarkedJobsIds.splice(jobIndex, 1);

    await user.save();

    res.json({ message: "Bookmark removed successfully", userInfo: user });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = removeBookmarkJob;
