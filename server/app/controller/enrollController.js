const { EnrollModel } = require("../models/EnrollModel");

let addEnroll = async (req, res) => {
  let { name, email, phone } = req.body;

  let resObj;

  try {
    let obj = {
      name,
      email,
      phone,
    };

    let data = await EnrollModel.insertOne(obj);

    resObj = {
      status: 1,
      msg: "You Enrolled",
      data,
    };
  } catch (err) {
    resObj = {
      status: 1,
      msg: "Not Enrolled",
      err,
    };
  }

  res.send(resObj);
};

let viewEnroll = async (req, res) => {
  let data = await EnrollModel.find();
  let resObj = {
    status: 1,
    msg: "Enrolls",
    data,
  };

  res.send(resObj);
};

module.exports = { addEnroll, viewEnroll };
