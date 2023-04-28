// ============imports=============
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const { strict } = require("assert");
require("dotenv").config();
const auth = require("./src/controllers/authController");
const app = express();
// ============ imporing routes ================

const authRoute = require("./src/routes/authRoute");
const clientRoute = require("./src/routes/clientRoute");
const employeeRoute = require("./src/routes/employeeRoute");
const contractRoute = require("./src/routes/contractRoute");
const fileRoute = require("./src/routes/fileRoute");






//========== configuration ============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(userData);

// configuring cors
//app.use(cors);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control"
  );
  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.status(200).send();
  } else {
    next();
  }
});
//=========== connecting to database ==============
mongoose.set("strictQuery", true);
mongoose   
  .connect(
    // "mongodb://localhost:27017/gbs",
    "mongodb+srv://root:root@opmcluster.dvzi5iq.mongodb.net/OPM?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("error has been occured: ", err));

// ========= configurring routes ==========

//app.use("/user", userRoute); not going to use those
app.use("/",authRoute);
app.use("/client", auth.verify, clientRoute);
app.use("/employee", auth.verify, employeeRoute);
app.use("/contract", auth.verify, contractRoute);
app.use("/file", auth.verify, fileRoute);

// ======== exporting app ========
module.exports = app;
