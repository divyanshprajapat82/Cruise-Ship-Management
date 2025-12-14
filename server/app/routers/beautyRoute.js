let express = require("express");
const { addMovie, movieView } = require("../controller/movieController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../utils/cloudinary");
const multer = require("multer");
const {
  addBeauty,
  beautyView,
  singleView,
  updateBeauty,
  deleteBeauty,
} = require("../controller/beautyController");

let beautyRoute = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Cruise-Ship-Management/beauty",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto" }],
  },
});

let upload = multer({ storage: storage });

beautyRoute.post("/add-beauty", upload.single("beautyImage"), addBeauty);
beautyRoute.get("/view", beautyView);
beautyRoute.get("/view/:id", singleView);
beautyRoute.put("/update/:id", upload.single("beautyImage"), updateBeauty);
beautyRoute.delete("/delete/:id", deleteBeauty);
// authRoute.post("/register", register);
// beautyRoute.post("/login", login);
// authRoute.get("/profile-View", authMiddleware, profileView);

module.exports = { beautyRoute };
