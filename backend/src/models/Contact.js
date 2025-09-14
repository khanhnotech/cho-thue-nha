
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, maxlength: 150 },
  apartment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment", required: true },
  landlord_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // nếu có tài khoản
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", ContactSchema);
