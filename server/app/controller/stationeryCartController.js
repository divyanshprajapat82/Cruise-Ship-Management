const { StationeryCartModel } = require("../models/StationeryCartModel");

let addToCart = async (req, res) => {
  let { id, image, price, category, qty, title, userId } = req.body;

  let checkproductInCart = await StationeryCartModel.findOne({
    productId: id,
    userId,
  });

  let resObj;

  if (checkproductInCart) {
    resObj = {
      status: 0,
      msg: "item Already in Cart",
    };
  } else {
    let obj = {
      productId: id,
      image,
      price,
      category,
      qty,
      title,
      userId,
    };

    let cart = await StationeryCartModel.insertOne(obj);

    resObj = {
      status: 1,
      msg: "item add in Cart",
      cart,
    };
  }

  res.send(resObj);
};

let viewCart = async (req, res) => {
  let { userId } = req.body;

  let data = await StationeryCartModel.find({ userId });
  let obj = {
    status: 1,
    data,
    msg: "Cart items view",
  };
  res.send(obj);
};

let deleteCart = async (req, res) => {
  let { cartId } = req.params;

  let cart = await StationeryCartModel.deleteOne({ _id: cartId });
  let obj = {
    status: 1,
    msg: "Cart Item Deleted",
    cart,
  };
  res.send(obj);
};

module.exports = { addToCart, viewCart, deleteCart };
