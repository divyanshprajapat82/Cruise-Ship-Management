let express = require("express");
const { addEnroll, viewEnroll } = require("../controller/enrollController");

let enrollRoute = express.Router();

enrollRoute.post("/add-enroll", addEnroll);
enrollRoute.get("/view", viewEnroll);

module.exports = { enrollRoute };
