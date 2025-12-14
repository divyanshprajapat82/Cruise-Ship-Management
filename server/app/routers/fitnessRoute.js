let express = require("express");
const { addMovie, movieView } = require("../controller/movieController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../utils/cloudinary");
const multer = require("multer");
const { addBeauty, beautyView } = require("../controller/beautyController");
const {
  addFitness,
  fitnessView,
  singleView,
  updateFitness,
  deleteFitness,
} = require("../controller/fitnessController");

let fitnessRoute = express.Router();

fitnessRoute.post("/add-fitness", addFitness);
fitnessRoute.get("/view", fitnessView);
fitnessRoute.get("/view/:id", singleView);
fitnessRoute.put("/update/:id", updateFitness);
fitnessRoute.delete("/delete/:id", deleteFitness);

module.exports = { fitnessRoute };
