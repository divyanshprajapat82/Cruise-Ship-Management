let express = require("express");
const { addMovie, movieView } = require("../controller/movieController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../utils/cloudinary");
const multer = require("multer");
const {
  addStationery,
  stationeryView,
  singleView,
  updateStationery,
  deleteStationery,
} = require("../controller/stationeryController");

let stationeryRoute = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Cruise-Ship-Management/stationery",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto" }],
  },
});

let upload = multer({ storage: storage });

stationeryRoute.post("/add-stationery", upload.single("image"), addStationery);
stationeryRoute.get("/view", stationeryView);
stationeryRoute.get("/view/:id", singleView);
stationeryRoute.put("/update/:id", upload.single("image"), updateStationery);
stationeryRoute.delete("/delete/:id", deleteStationery);

module.exports = { stationeryRoute };
