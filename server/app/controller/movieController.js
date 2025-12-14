const { MovieModel } = require("../models/MovieModel");

let addMovie = async (req, res) => {
  let { movieName, duration, price, hall, technique, type } = req.body;
  let resObj;
  try {
    let obj = {
      movieName,
      duration,
      price,
      hall,
      technique,
      type,
    };
    if (req.file) {
      obj["movieImage"] = req.file.path;
    }
    let data = await MovieModel.insertOne(obj);
    resObj = {
      status: 1,
      data,
      msg: "Movie Added!",
    };
  } catch (error) {
    resObj = {
      status: 0,
      msg: "Error processing request",
      error: error.message,
    };
  }
  res.send(resObj);
};

let movieView = async (req, res) => {
  const data = await MovieModel.find();
  res.send({ status: 1, data, msg: "Movies" });
};

module.exports = { addMovie, movieView };
