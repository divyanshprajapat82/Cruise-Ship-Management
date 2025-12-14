const mongoose = require("mongoose");

let beautySchema = new mongoose.Schema(
  {
    beautyName: String,
    price: Number,
    gender: String,
    beautyImage: String,
  },
  {
    timestamps: true, 
  }
);

let BeautyModel = mongoose.model("Beauty", beautySchema);
module.exports = { BeautyModel };
