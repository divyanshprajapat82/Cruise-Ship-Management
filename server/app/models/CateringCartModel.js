const mongoose = require("mongoose");

let cateringCartSchema = new mongoose.Schema({
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
    ref: "Catering",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

let CateringCartModel = mongoose.model("Cart", cateringCartSchema);
module.exports = { CateringCartModel };
