const mongoose = require("mongoose");

let enrollSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    phone: Number,
  },
  {
    timestamps: true, 
  }
);

let EnrollModel = mongoose.model("Enroll", enrollSchema);
module.exports = { EnrollModel };
