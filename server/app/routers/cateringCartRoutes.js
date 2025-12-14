let express = require("express");
const { checkToken } = require("../middleware/checkToken");
const {
  addToCart,
  viewCart,
  deleteCart,
} = require("../controller/cateringCartController");
let cateringCartRoutes = express.Router();

cateringCartRoutes.post("/add-to-cart", checkToken, addToCart );
cateringCartRoutes.post("/view", checkToken, viewCart);
cateringCartRoutes.delete("/delete-cart/:cartId", deleteCart);

module.exports = { cateringCartRoutes };
