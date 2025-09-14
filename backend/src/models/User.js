const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  gmail: { type: String, required: true, unique: true },
  phone: {type: String, unique: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["tenant", "landlord", "admin"], default: "tenant" },
  isVerifyfied: { type: Boolean, default: false}, // check xat thuc gmail
  google_id: { type: String }, // nếu đăng nhập Google
}, {
  timestamps: true
});

module.exports = mongoose.model("User", UserSchema);
