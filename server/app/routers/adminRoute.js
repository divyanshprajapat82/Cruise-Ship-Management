let express = require("express");
const { authRoute } = require("./authRoute");
const { movieRoute } = require("./movieRoute");
const { beautyRoute } = require("./beautyRoute");
const { fitnessRoute } = require("./fitnessRoute");
const { partyHallRoute } = require("./PartyHall");
const { cateringRoute } = require("./cateringRoute");
const { stationeryRoute } = require("./stationeryRoute");
const { cateringCartRoutes } = require("./cateringCartRoutes");
const { orderRoutes } = require("./orderRoute");
const { stationeryCartRoutes } = require("./stationeryCartRoutes");
const { enrollRoute } = require("./enrollRoute");

let adminRoute = express.Router();

adminRoute.use("/auth", authRoute);
adminRoute.use("/enroll", enrollRoute);
adminRoute.use("/movie", movieRoute);
adminRoute.use("/beauty", beautyRoute);
adminRoute.use("/fitness", fitnessRoute);
adminRoute.use("/party-hall", partyHallRoute);
adminRoute.use("/catering", cateringRoute);
adminRoute.use("/stationery", stationeryRoute);
adminRoute.use("/catering-cart", cateringCartRoutes);
adminRoute.use("/stationery-cart", stationeryCartRoutes);
adminRoute.use("/order", orderRoutes);

module.exports = { adminRoute };
