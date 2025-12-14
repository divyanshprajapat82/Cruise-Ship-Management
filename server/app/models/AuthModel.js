const mongoose = require("mongoose");

let authSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    password: String,
    role: {
      type: String,
    },
    membership: {
      type: String,
    },
    phone: Number,
    image: String,
  },
  {
    timestamps: true,
  }
);

let AuthModel = mongoose.model("User", authSchema);
module.exports = { AuthModel };
