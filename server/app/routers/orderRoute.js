let express = require("express");
const { checkToken } = require("../middleware/checkToken");
const {
  cateringOrder,
  stationeryOrder,
  viewOrders,
  booking,
  viewBookedOrders,
  viewMovieOrder,
  viewSalonOrder,
  viewFitnessOrder,
  viewPartyHallOrder,
  viewCateringOrder,
  viewStationeryOrder,
} = require("../controller/orderController");
let orderRoutes = express.Router();

orderRoutes.post("/add-catering-order", checkToken, cateringOrder);
orderRoutes.post("/add-stationery-order", checkToken, stationeryOrder);
orderRoutes.post("/add-booking", checkToken, booking);
orderRoutes.get("/view", viewOrders);
orderRoutes.post("/booked-view", checkToken, viewBookedOrders);
orderRoutes.get("/movie-order-view", viewMovieOrder);
orderRoutes.get("/salon-order-view", viewSalonOrder);
orderRoutes.get("/fitness-order-view", viewFitnessOrder);
orderRoutes.get("/party-hall-order-view", viewPartyHallOrder);
orderRoutes.get("/catering-order-view", viewCateringOrder);
orderRoutes.get("/stationery-order-view", viewStationeryOrder);

module.exports = { orderRoutes };
