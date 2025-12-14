const { BeautyModel } = require("../models/BeautyModel");
const { FitnessModel } = require("../models/FitnessModel");
const { MovieModel } = require("../models/MovieModel");

let addFitness = async (req, res) => {
  let { trainerName, price, time, hall } = req.body;
  let resObj;
  try {
    let obj = {
      trainerName,
      price,
      time,
      hall,
    };
    let data = await FitnessModel.insertOne(obj);
    resObj = {
      status: 1,
      data,
      msg: "Fitness Added!",
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

let fitnessView = async (req, res) => {
  const data = await FitnessModel.find();
  res.send({ status: 1, data, msg: "fitness" });
};

let singleView = async (req, res) => {
  let { id } = req.params;
  const data = await FitnessModel.find({ _id: id });
  res.send({ status: 1, data, msg: "Single fitness" });
};

let updateFitness = async (req, res) => {
  let { trainerName, price, time, hall } = req.body;
  let { id } = req.params;

  let resObj;

  try {
    let data = await FitnessModel.updateOne(
      { _id: id },
      {
        $set: {
          trainerName,
          price,
          time,
          hall,
        },
      }
    );

    resObj = {
      status: 1,
      msg: "Fitness Updated",
      data,
    };
  } catch (err) {
    resObj = {
      status: 0,
      msg: "Error processing request",
      error: err.message,
    };
  }
  res.send(resObj);
};

let deleteFitness = async (req, res) => {
  let { id } = req.params;
  const data = await FitnessModel.deleteOne({ _id: id });
  res.send({ status: 1, data, msg: "Fitness Deleted" });
};

module.exports = {
  addFitness,
  fitnessView,
  singleView,
  updateFitness,
  deleteFitness,
};
