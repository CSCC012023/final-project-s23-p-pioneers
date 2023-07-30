const mongoose = require("mongoose");

const jobSchema = require("../Schemas/post");

const Job = mongoose.model("Job", jobSchema);

const getJobPost = async (req, res) => {

  const { id, requestType } = req.body;
  try {
    if (id != undefined) {
      const jobPost = await Job.find({ jobId: id });

      if (!jobPost) {
        return res.status(404).json({ error: "Job post not found" });
      }

      res.json(jobPost);
    } else {
      let jobPost;

      if (requestType == "all") {
        const currentDate = new Date();

        jobPost = await Job.find({ deadline: { $gte: currentDate } });
      } else if (requestType == "latest") {
        const date = new Date();
        date.setDate(date.getDate() - 7);

        jobPost = await Job.find({ datePosted: { $gte: date } });
      } else if (requestType == "deadline") {
        const date = new Date();
        date.setDate(date.getDate() + 7);

        jobPost = await Job.find({ deadline: { $lte: date } });
      } else if (requestType == "expired") {
        const currentDate = new Date();
        const dateSevenDaysAgo = new Date();
        dateSevenDaysAgo.setDate(dateSevenDaysAgo.getDate() - 7);

        jobPost = await Job.find({
          deadline: { $lte: currentDate, $gte: dateSevenDaysAgo },
        });
      }

      if (!jobPost) {
        return res.status(404).json({ error: "Job post not found" });
      }
      
      res.json(jobPost);
    }
    // console.log(jobPost)
  } catch (error) {
    console.error("Error retrieving job post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getJobPost;
