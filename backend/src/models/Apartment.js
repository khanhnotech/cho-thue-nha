const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater")

mongoose.plugin(slug)
const ApartmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    furniture: { type: String },
    num_people: { type: Number },
    deposit: { type: Number },
    description: { type: String },
    tempImages: { type: [String] },
    images: { type: [String] },
    street_name: { type: String, required: true },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "rented", "rejected"],
      default: "available",
    },
    rejectReason: {
      type: String,
      default: null,
    },
  slug: {type: String, slug:"title", unique: true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Apartment", ApartmentSchema);
