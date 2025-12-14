let jwt = require("jsonwebtoken");
let checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ status: 0, msg: "Authorization header missing" });
  }
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.TOKENKEY);
    req.body.userId = decoded.id;

    next();
  } catch (err) {}
};

module.exports = { checkToken };
