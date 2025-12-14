const { BeautyModel } = require("../models/BeautyModel");
const { FitnessModel } = require("../models/FitnessModel");
const { MovieModel } = require("../models/MovieModel");
const { PartyHallModel } = require("../models/PartyHall");

let addPartyHall = async (req, res) => {
  let { hallName, capacity, price, hall, isAvailable } = req.body;
  let resObj;
  try {
    let obj = {
      hallName,
      capacity,
      price,
      hall,
      isAvailable,
    };
    let data = await PartyHallModel.insertOne(obj);
    resObj = {
      status: 1,
      data,
      msg: "Party Hall Added!",
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

let partyHallView = async (req, res) => {
  const data = await PartyHallModel.find();
  res.send({ status: 1, data, msg: "Party Party Hall" });
};

let singleView = async (req, res) => {
  let { id } = req.params;
  const data = await PartyHallModel.find({ _id: id });
  res.send({ status: 1, data, msg: "Single Party Hall" });
};

let updatePartyHall = async (req, res) => {
  let { hallName, capacity, price, hall, isAvailable } = req.body;
  let { id } = req.params;

  let resObj;

  try {
    let data = await PartyHallModel.updateOne(
      { _id: id },
      {
        $set: {
          hallName,
          capacity,
          price,
          hall,
          isAvailable,
        },
      }
    );

    resObj = {
      status: 1,
      msg: "Party Hall Updated",
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

let deletePartyHall = async (req, res) => {
  let { id } = req.params;
  const data = await PartyHallModel.deleteOne({ _id: id });
  res.send({ status: 1, data, msg: "Party Hall Deleted" });
};

module.exports = {
  addPartyHall,
  partyHallView,
  singleView,
  updatePartyHall,
  deletePartyHall,
};
