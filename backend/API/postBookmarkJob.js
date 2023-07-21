const mongoose = require("mongoose");
const signUpSchema = require("../Schemas/userSchema");
const jobSchema = require("../Schemas/post");

const User = mongoose.model("users", signUpSchema);
const Job = mongoose.model("Job", jobSchema);

const postBookmarkJob = async (req, res) => {
  try {
    const { username, jobId } = req.body;

    if (!username || !jobId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({ username });


    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const job = await Job.findOne({ jobId });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const bookmarkedJobIds = user.bookmarkedJobsIds.map((bookmark) =>
      bookmark.toString()
    );

    if (bookmarkedJobIds.includes(jobId)) {
      // If the job is already bookmarked, remove it from the bookmarks
      user.bookmarkedJobsIds = user.bookmarkedJobsIds.filter(
        (bookmark) => bookmark.toString() !== jobId
      );
    } else {
      // If the job is not bookmarked, add it to the bookmarks
      user.bookmarkedJobsIds.push(job);
    }

    await user.save();

    res.json({ userInfo: user });
  } catch (error) {
    console.error("Error retrieving job post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = postBookmarkJob;
