const mongoose = require("mongoose");

let cateringSchema = new mongoose.Schema(
  {
    itemName: String,
    category: String,
    description: String,
    price: Number,
    prepTime: String,
    isAvailable: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

let CateringModel = mongoose.model("Catering", cateringSchema);
module.exports = { CateringModel };
