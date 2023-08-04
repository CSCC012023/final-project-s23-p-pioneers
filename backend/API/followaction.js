const mongoose = require("mongoose");
const signUpSchema = require("../Schemas/userSchema");

const User = mongoose.model("users", signUpSchema);

const followUser = async (req, res) => {
    try {
      const currentUsername = req.body.currentUserId; // Assuming you pass the current user's username in the request body
      const targetUsername = req.body.userId; // Assuming you pass the target user's username in the request body
  
      // Make sure that both the current user and the target user exist in the database
      const currentUser = await User.findOne({ username: currentUsername });
      const targetUser = await User.findOne({ username: targetUsername });
  
      if (!currentUser || !targetUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Add the target user's username to the "following" list of the current user
      if (!currentUser.following.includes(targetUser.username)) {
        currentUser.following.push(targetUser.username);
        await currentUser.save();
      }
  
      // Add the current user's username to the "followers" list of the target user
      if (!targetUser.followers.includes(currentUser.username)) {
        targetUser.followers.push(currentUser.username);
        await targetUser.save();
      }
  
      res.status(200).json({ message: 'Successfully followed the user' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  
  const checkFollowStatus = async (req, res) => {
    try {
      const user1Username = req.body.user1; // Assuming you pass user1's username in the request body
      const user2Username = req.body.user2; // Assuming you pass user2's username in the request body
  
      // Make sure that both users exist in the database
      const user1 = await User.findOne({ username: user1Username });
      const user2 = await User.findOne({ username: user2Username });
  
      if (!user1 || !user2) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if user1 follows user2
      const isUser1FollowingUser2 = user1.following.includes(user2.username);
  
      res.status(200).json({ isFollowing: isUser1FollowingUser2 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
const unfollowUser = async (req, res) => {
    try {

      const currentUsername = req.body.currentUserId; // Assuming you pass the current user's username in the request body
      const targetUsername = req.body.userId; // Assuming you pass the target user's username in the request body
  
      // Make sure that both the current user and the target user exist in the database
      const currentUser = await User.findOne({ username: currentUsername });
      const targetUser = await User.findOne({ username: targetUsername });
  
      if (!currentUser || !targetUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
  
      if (!currentUser || !targetUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Remove the target user's username from the "following" list of the current user
      const followingIndex = currentUser.following.indexOf(targetUser.username);
      if (followingIndex !== -1) {
        currentUser.following.splice(followingIndex, 1);
        await currentUser.save();
      }
  
      // Remove the current user's username from the "followers" list of the target user
      const followersIndex = targetUser.followers.indexOf(currentUser.username);
      if (followersIndex !== -1) {
        targetUser.followers.splice(followersIndex, 1);
        await targetUser.save();
      }
  
      res.status(200).json({ message: "Successfully unfollowed the user" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
}

module.exports = { followUser, unfollowUser, checkFollowStatus };
