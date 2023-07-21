const mongoose = require("mongoose");

const signUpSchema = require("../Schemas/userSchema");
const jobSchema = require("../Schemas/post");

const User = mongoose.model("users", signUpSchema);


const getUser = async (req, res) => {
    try {
        const { username } = req.body;
    
        if (!username) {
          return res.status(400).json({ error: "Missing required fields" });
        }
    
        // Find the user in the database by username
        const user = await User.findOne({ username })
            .populate("bookmarkedJobsIds")
            .populate("appliedJobsIds")

    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Return the user information
        res.json({ user });
      } catch (error) {
        console.error("Error retrieving user information:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

module.exports = getUser;


