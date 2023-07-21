const mongoose = require("mongoose");
const signUpSchema = require("../Schemas/userSchema");
const bcrypt = require("bcrypt");

const User = mongoose.model("user", signUpSchema);

const verifyEmail = async (req, res) => {
  const { uniqueString } = req.body;

  try {
    const user = await User.findOne({
      "verification.uniqueString": uniqueString,
    });
    if (!user) {
      return res
        .status(200)
        .json({ message: "Invalid verficiation token", isValid: false });
    }
    if (user.verification.verified) {
      return res
        .status(200)
        .json({ message: "Email already verified", isValid: false });
    }

    if (user.verification.expiresAt < Date.now()) {
      await User.findOneAndDelete({
        "verification.uniqueString": uniqueString,
      });
      return res.status(200).json({
        message: "Verification link expired, please reregister your account",
        isValid: false,
      });
    }

    user.verification.verified = true;
    await user.save();
    return res.json({
      message: "Your account has been verified",
      isValid: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, isValid: false });
  }
};

module.exports = verifyEmail;
