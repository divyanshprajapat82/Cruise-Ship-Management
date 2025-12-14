const { BeautyModel } = require("../models/BeautyModel");

let addBeauty = async (req, res) => {
  let { beautyName, gender, price } = req.body;
  let resObj;
  try {
    let obj = {
      beautyName,
      gender,
      price,
    };
    if (req.file) {
      obj["beautyImage"] = req.file.path;
    }
    let data = await BeautyModel.insertOne(obj);
    resObj = {
      status: 1,
      data,
      msg: "Beauty Added!",
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

let beautyView = async (req, res) => {
  const data = await BeautyModel.find();
  res.send({ status: 1, data, msg: "Beauties" });
};

let singleView = async (req, res) => {
  let { id } = req.params;
  const data = await BeautyModel.find({ _id: id });
  res.send({ status: 1, data, msg: "Single Beauty" });
};

let updateBeauty = async (req, res) => {
  let { beautyName, price, gender } = req.body;
  let { id } = req.params;

  let resObj;

  try {
    let obj = {
      beautyName,
      price,
      gender,
    };
    if (req.file) {
      obj["beautyImage"] = req.file.path;
    }
    let data = await BeautyModel.updateOne({ _id: id }, { $set: obj });

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

let deleteBeauty = async (req, res) => {
  let { id } = req.params;
  const data = await BeautyModel.deleteOne({ _id: id });
  res.send({ status: 1, data, msg: "Beauty Deleted" });
};

module.exports = {
  addBeauty,
  beautyView,
  singleView,
  updateBeauty,
  deleteBeauty,
};
