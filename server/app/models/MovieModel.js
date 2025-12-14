const mongoose = require("mongoose");

let movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      unique: true,
      required: true,
    },
    price: Number,
    duration: String,
    hall: String,
    technique: {
      type: String,
    },
    type: String,
    movieImage: String,
  },
  {
    timestamps: true, 
  }
);

let MovieModel = mongoose.model("Movie", movieSchema);
module.exports = { MovieModel };
