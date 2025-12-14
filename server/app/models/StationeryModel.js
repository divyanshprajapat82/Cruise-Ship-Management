const mongoose = require("mongoose");

let stationerySchema = new mongoose.Schema(
  {
    itemName: String,
    description: String,
    price: Number,
    isAvailable: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

let StationeryModel = mongoose.model("Stationery", stationerySchema);
module.exports = { StationeryModel };
