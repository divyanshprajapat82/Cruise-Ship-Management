let express = require("express");
const { addMovie, movieView } = require("../controller/movieController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../utils/cloudinary");
const multer = require("multer");

let movieRoute = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Cruise-Ship-Management/movies",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto" }],
  },
});

let upload = multer({ storage: storage });

movieRoute.post("/add-movie", upload.single("movieImage"), addMovie);
movieRoute.get("/view", movieView);

module.exports = { movieRoute };
