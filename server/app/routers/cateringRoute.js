let express = require("express");
const { addMovie, movieView } = require("../controller/movieController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../utils/cloudinary");
const multer = require("multer");
const {
  addCatering,
  cateringView,
  singleView,
  updateCatering,
  deleteCatering,
} = require("../controller/cateringController");

let cateringRoute = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Cruise-Ship-Management/catering",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto" }],
  },
});

let upload = multer({ storage: storage });

cateringRoute.post("/add-food", upload.single("image"), addCatering);
cateringRoute.get("/view", cateringView);
cateringRoute.get("/view/:id", singleView);
cateringRoute.put("/update/:id", upload.single("image"), updateCatering);
cateringRoute.delete("/delete/:id", deleteCatering);

module.exports = { cateringRoute };
