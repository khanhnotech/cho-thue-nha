const DistrictSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // ví dụ: "009"
  name: { type: String, required: true }, // "Thanh Xuân"
  province: { type: mongoose.Schema.Types.ObjectId, ref: "Province", required: true }
});

module.exports = mongoose.model("District", DistrictSchema);
