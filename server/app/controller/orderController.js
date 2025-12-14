const { OrderModel } = require("../models/OrderModel");
const { CartModel, CateringCartModel } = require("../models/CateringCartModel");
const { StationeryCartModel } = require("../models/StationeryCartModel");

let cateringOrder = async (req, res) => {
  let { userId, orderType } = req.body;

  let cartItems = await CateringCartModel.find({ userId });

  if (cartItems.length == 0) {
    resObj = {
      status: 0,
      msg: "No items in cart",
    };
    return res.send(resObj);
  }

  let resObj;

  let ordered = [];

  for (let item of cartItems) {
    let checkproductInCart = await OrderModel.findOne({
      productId: item.productId,
      userId,
    });
    if (!checkproductInCart) {
      let obj = {
        image: item.image,
        price: item.price,
        title: item.title,
        qty: item.qty,
        userId,
        orderType,
      };

      let data = await OrderModel.insertOne(obj);
      ordered.push(data);

      await CateringCartModel.deleteMany({ userId });
    }
  }

  resObj = {
    status: 1,
    msg: "item add Ordered",
    ordered,
  };

  res.send(resObj);
};

let stationeryOrder = async (req, res) => {
  let { userId, orderType } = req.body;

  let cartItems = await StationeryCartModel.find({ userId });

  if (cartItems.length == 0) {
    resObj = {
      status: 0,
      msg: "No items in cart",
    };
    return res.send(resObj);
  }

  let resObj;

  let ordered = [];

  for (let item of cartItems) {
    let checkproductInCart = await OrderModel.findOne({
      productId: item.productId,
      userId,
    });
    if (!checkproductInCart) {
      let obj = {
        image: item.image,
        price: item.price,
        title: item.title,
        qty: item.qty,
        userId,
        orderType,
      };

      let data = await OrderModel.insertOne(obj);
      ordered.push(data);

      await StationeryCartModel.deleteMany({ userId });
    }
  }

  resObj = {
    status: 1,
    msg: "item add Ordered",
    ordered,
  };

  res.send(resObj);
};

let booking = async (req, res) => {
  let { productId, title, image, price, userId, orderType } = req.body;

  let resObj;

  let checkproductInCart = await OrderModel.findOne({
    productId,
    userId,
  });

  if (!checkproductInCart) {
    let obj = {
      productId,
      title,
      image,
      price,
      userId,
      orderType,
    };

    let data = await OrderModel.insertOne(obj);

    resObj = {
      status: 1,
      msg: "Item Booked",
      data,
    };
  } else {
    resObj = {
      status: 0,
      msg: "Item Not Booked",
      data,
    };
  }

  res.send(resObj);
};

let viewOrders = async (req, res) => {
  let data = await OrderModel.find().populate("userId", "name");
  let obj = {
    status: 1,
    data,
    msg: "Cart items view",
  };
  res.send(obj);
};

let viewBookedOrders = async (req, res) => {
  let { userId } = req.body;

  let data = await OrderModel.find({ userId }).populate("userId", "name");
  let obj = {
    status: 1,
    data,
    msg: "Cart items view",
  };
  res.send(obj);
};

let viewMovieOrder = async (req, res) => {
  let data = await OrderModel.find({ orderType: "movies" }).populate(
    "userId",
    "name phone"
  );

  let obj = {
    status: 1,
    data,
    msg: "Movie Orders view",
  };
  res.send(obj);
};

let viewSalonOrder = async (req, res) => {
  let data = await OrderModel.find({ orderType: "beauty" }).populate(
    "userId",
    "name phone"
  );

  let obj = {
    status: 1,
    data,
    msg: "Beauty Orders view",
  };
  res.send(obj);
};

let viewFitnessOrder = async (req, res) => {
  let data = await OrderModel.find({ orderType: "fitness" }).populate(
    "userId",
    "name phone"
  );

  let obj = {
    status: 1,
    data,
    msg: "Beauty Orders view",
  };
  res.send(obj);
};

let viewPartyHallOrder = async (req, res) => {
  let data = await OrderModel.find({ orderType: "PartyHall" }).populate(
    "userId",
    "name phone"
  );
  let obj = {
    status: 1,
    data,
    msg: "Beauty Orders view",
  };
  res.send(obj);
};

let viewCateringOrder = async (req, res) => {
  let data = await OrderModel.find({ orderType: "catering" }).populate(
    "userId",
    "name phone"
  );
  let obj = {
    status: 1,
    data,
    msg: "Beauty Orders view",
  };
  res.send(obj);
};

let viewStationeryOrder = async (req, res) => {
  let data = await OrderModel.find({ orderType: "stationery" }).populate(
    "userId",
    "name phone"
  );
  let obj = {
    status: 1,
    data,
    msg: "Beauty Orders view",
  };
  res.send(obj);
};

module.exports = {
  cateringOrder,
  stationeryOrder,
  viewOrders,
  booking,
  viewBookedOrders,
  viewMovieOrder,
  viewSalonOrder,
  viewFitnessOrder,
  viewPartyHallOrder,
  viewCateringOrder,
  viewStationeryOrder,
};
