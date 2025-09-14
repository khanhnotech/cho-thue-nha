
const mongoose = require("mongoose");

const NewsSectionSchema = new mongoose.Schema({
  news_id: { type: mongoose.Schema.Types.ObjectId, ref: "News", required: true },
  section_title: { type: String },
  content: { type: String }
});

module.exports = mongoose.model("NewsSection", NewsSectionSchema);
