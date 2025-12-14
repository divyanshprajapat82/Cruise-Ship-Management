const mongoose = require("mongoose");

let partyHallSchema = new mongoose.Schema(
  {
    hallName: String,
    capacity: Number,
    price: Number,
    hall: String,
    isAvailable: String,
  },
  {
    timestamps: true,
  }
);

let PartyHallModel = mongoose.model("PartyHall", partyHallSchema);
module.exports = { PartyHallModel };
