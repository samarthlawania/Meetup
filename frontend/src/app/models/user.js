const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: string, required: true },
  email: { type: string },
  profilePicture: { type: string },
  isVerified: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model("User", UserSchema);
