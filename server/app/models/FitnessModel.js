const mongoose = require("mongoose");

let fitnessSchema = new mongoose.Schema(
  {
    trainerName: String,
    price: Number,
    time: String,
    hall: String,
  },
  {
    timestamps: true, 
  }
);

let FitnessModel = mongoose.model("Fitness", fitnessSchema);
module.exports = { FitnessModel };
