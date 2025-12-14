const { BeautyModel } = require("../models/BeautyModel");
const { CateringModel } = require("../models/CateringModel");
const { MovieModel } = require("../models/MovieModel");

let addCatering = async (req, res) => {
  let { itemName, category, description, price, prepTime, isAvailable } =
    req.body;
  let resObj;
  try {
    let obj = {
      itemName,
      category,
      description,
      price,
      prepTime,
      isAvailable,
    };
    if (req.file) {
      obj["image"] = req.file.path;
    }
    let data = await CateringModel.insertOne(obj);
    resObj = {
      status: 1,
      data,
      msg: "Food Added!",
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

let cateringView = async (req, res) => {
  const data = await CateringModel.find();
  res.send({ status: 1, data, msg: "Foods" });
};

let singleView = async (req, res) => {
  let { id } = req.params;
  const data = await BeautyModel.find({ _id: id });
  res.send({ status: 1, data, msg: "Single Beauty" });
};

let updateCatering = async (req, res) => {
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

let deleteCatering = async (req, res) => {
  let { id } = req.params;
  const data = await BeautyModel.deleteOne({ _id: id });
  res.send({ status: 1, data, msg: "Beauty Deleted" });
};

module.exports = {
  addCatering,
  cateringView,
  singleView,
  updateCatering,
  deleteCatering,
};
