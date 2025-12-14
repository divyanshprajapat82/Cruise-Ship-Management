const mongoose = require("mongoose");

let stationeryCartSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  category: String,
  image: String,
  cartStatus: Boolean,
  price: Number,
  qty: Number,
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Stationery",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

let StationeryCartModel = mongoose.model(
  "StationeryCart",
  stationeryCartSchema
);
module.exports = { StationeryCartModel };
