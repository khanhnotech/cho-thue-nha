const mongoose = require('mongoose')

const VerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gmail: {type: String, required: true},
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Verification", VerificationSchema);