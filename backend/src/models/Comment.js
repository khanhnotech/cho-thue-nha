
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  news_id: { type: mongoose.Schema.Types.ObjectId, ref: "News" },
  apartment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment" },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);
