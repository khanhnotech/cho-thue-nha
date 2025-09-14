
const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ["news", "guide", "advise"], required: true },
  excerpt: { type: String },
  image: { type: String },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("News", NewsSchema);
