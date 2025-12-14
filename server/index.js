let express = require("express");
let cors = require("cors");
const { default: mongoose } = require("mongoose");
const { AuthModel } = require("./app/models/AuthModel");
const { adminRoute } = require("./app/routers/adminRoute");
require("dotenv").config();

let app = express();
app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: [
      "https://cruise-ship-management-six.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/ship", adminRoute);

mongoose
  // .connect("mongodb://127.0.0.1:27017/cruiseShipManagement")
  .connect(
    "mongodb+srv://divyanshprajapat82_db_user:qPzDQXALR44xSJM0@cluster0.80b1cxe.mongodb.net/"
  )
  .then(async () => {
    const checkAdmin = await AuthModel.findOne({ role: "admin" });
    if (!checkAdmin) {
      await AuthModel.insertOne({
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin1234",
        role: "admin",
      });
    }
    console.log("DB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server runing on ${process.env.PORT}`)
    );
  });
