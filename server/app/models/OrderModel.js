const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
  productId: String,
  orderType: String,
  title: String,
  image: String,
  price: Number,
  qty: Number,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

let OrderModel = mongoose.model("Order", orderSchema);
module.exports = { OrderModel };
