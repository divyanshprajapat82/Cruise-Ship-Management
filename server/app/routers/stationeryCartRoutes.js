let express = require("express");
const { checkToken } = require("../middleware/checkToken");
const {
  addToCart,
  viewCart,
  deleteCart,
} = require("../controller/stationeryCartController");
let stationeryCartRoutes = express.Router();

stationeryCartRoutes.post("/add-to-cart", checkToken, addToCart);
stationeryCartRoutes.post("/view", checkToken, viewCart);
stationeryCartRoutes.delete("/delete-cart/:cartId", deleteCart);

module.exports = { stationeryCartRoutes };
