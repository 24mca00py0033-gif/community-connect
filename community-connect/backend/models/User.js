const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true, default: "" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false }, // bcrypt hash
    profession: { type: String, trim: true, default: "" }, // e.g. CA, CE, Doctor
    company: { type: String, trim: true, default: "" },
    locality: { type: String, trim: true, default: "" },
    mobile: { type: String, trim: true, default: "" },
    profilePic: { type: String, default: "" }, // Cloudinary URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
