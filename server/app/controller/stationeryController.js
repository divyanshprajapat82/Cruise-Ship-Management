const { StationeryModel } = require("../models/StationeryModel");

let addStationery = async (req, res) => {
  let { itemName, description, price, isAvailable } = req.body;
  let resObj;
  try {
    let obj = {
      itemName,
      description,
      price,
      isAvailable,
    };
    if (req.file) {
      obj["image"] = req.file.path;
    }
    let data = await StationeryModel.insertOne(obj);
    resObj = {
      status: 1,
      data,
      msg: "Stationery Item Added!",
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

let stationeryView = async (req, res) => {
  const data = await StationeryModel.find();
  res.send({ status: 1, data, msg: "Foods" });
};

let singleView = async (req, res) => {
  let { id } = req.params;
  const data = await StationeryModel.find({ _id: id });
  res.send({ status: 1, data, msg: "Single Beauty" });
};

let updateStationery = async (req, res) => {
  let { beautyName, gender } = req.body;
  let { id } = req.params;

  let resObj;

  try {
    let obj = {
      beautyName,
      gender,
    };
    if (req.file) {
      obj["beautyImage"] = req.file.path;
    }
    let data = await StationeryModel.updateOne({ _id: id }, { $set: obj });

    resObj = {
      status: 1,
      msg: "Beauty Updated",
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

let deleteStationery = async (req, res) => {
  let { id } = req.params;
  const data = await StationeryModel.deleteOne({ _id: id });
  res.send({ status: 1, data, msg: "Beauty Deleted" });
};

module.exports = {
  addStationery,
  stationeryView,
  singleView,
  updateStationery,
  deleteStationery,
};
