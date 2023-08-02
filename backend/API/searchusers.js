const mongoose = require("mongoose");
const signUpSchema = require("../Schemas/userSchema");
const User = mongoose.model("users", signUpSchema);

const searchusers = async (req, res) => {
  try {
    const keyword = req.body.keyword;

    // If the keyword is empty, return all users without applying any search filters
    if (!keyword) {
      const allUsers = await User.find().limit(10).exec();
      return res.status(200).json(allUsers);
    }

    // Perform a case-insensitive search for users whose username or name includes the keyword
    const users = await User.find({
      $or: [
        { username: { $regex: `^${keyword}`, $options: "i" } },
        { name: { $regex: `^${keyword}`, $options: "i" } },
      ],
    })
    .limit(10)
    
    .exec();

    // Check if users array is empty
    if (users.length === 0) {
      return res.status(200).json([]); // Return an empty JSON array
    }

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = searchusers;
