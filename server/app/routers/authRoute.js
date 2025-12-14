let express = require("express");
const {
  addUser,
  login,
  UserView,
  register,
  profileView,
  deleteUser,
} = require("../controller/authController");
const { checkToken } = require("../middleware/checkToken");

let authRoute = express.Router();

authRoute.post("/add-user", addUser);
authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/view", UserView);
authRoute.post("/profile-View", checkToken, profileView);
authRoute.delete("/delete/:id", deleteUser);
// authRoute.get("/view/:id", singleView);
// authRoute.put("/update/:id", updateUser);

module.exports = { authRoute };
