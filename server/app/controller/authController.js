const { AuthModel } = require("../models/AuthModel");
let jwt = require("jsonwebtoken");

let addUser = async (req, res) => {
  let { name, email, role, phone } = req.body;
  let resObj;
  let emailfind = await AuthModel.findOne({ email });
  if (!emailfind) {
    try {
      let obj = {
        name,
        email,
        role,
        phone,
      };
      let data = await AuthModel.insertOne(obj);
      resObj = {
        status: 1,
        data,
        msg: "User Added!",
      };
    } catch (error) {
      resObj = {
        status: 0,
        msg: "Error processing request",
        error: error.message,
      };
    }
  } else {
    resObj = {
      status: 0,
      msg: "Email is aleardy existe",
    };
  }
  res.send(resObj);
};

let register = async (req, res) => {
  let { email, password } = req.body;

  let resObj;

  try {
    let user = await AuthModel.findOneAndUpdate(
      { email },
      {
        $set: {
          password,
        },
      }
    );

    resObj = {
      status: 1,
      msg: "You are Registered!",
      user,
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

let login = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    // const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: 0, msg: "Email and password required" });
    }

    const user = await AuthModel.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .send({ status: 0, msg: "Invalid username or password" });
    }

    let token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKENKEY,
      { expiresIn: "7d" }
    );

    const role = await AuthModel.find({ email }).select("role");

    // return res.send({ status: 1, msg: "Logged In" });
    return res.send({ status: 1, role, token, msg: "Logged In" });
  } catch (err) {
    return res.status(500).send({ status: 0, msg: err.message });
  }
};

let UserView = async (req, res) => {
  const data = await AuthModel.find().select("-password");
  res.send({ status: 1, data, msg: "Users" });
};

let profileView = async (req, res) => {
  let { userId } = req.body;

  let data = await AuthModel.find({ _id: userId }).select("-password");

  let obj = {
    status: 1,
    data,
    msg: "Profile",
  };
  res.send(obj);
};

let deleteUser = async (req, res) => {
  let { id } = req.params;
  const data = await AuthModel.deleteOne({ _id: id });
  res.send({ status: 1, data, msg: "User Deleted" });
};

module.exports = {
  addUser,
  register,
  login,
  UserView,
  profileView,
  deleteUser,
};
