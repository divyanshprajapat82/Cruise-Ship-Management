let express = require("express");
const {
  addPartyHall,
  partyHallView,
  updatePartyHall,
  deletePartyHall,
  singleView,
} = require("../controller/partyHall");

let partyHallRoute = express.Router();

partyHallRoute.post("/add-party-hall", addPartyHall);
partyHallRoute.get("/view", partyHallView);
partyHallRoute.get("/view/:id", singleView);
partyHallRoute.put("/update/:id", updatePartyHall);
partyHallRoute.delete("/delete/:id", deletePartyHall);

module.exports = { partyHallRoute };
