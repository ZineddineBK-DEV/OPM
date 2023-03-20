// ============imports=============
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const { strict } = require("assert");
const app = express();
// ============ imporing routes ================

const userRoute= require("./src/routes/userRoute");
const clientRoute= require("./src/routes/clientRoute");
const employeeRoute= require("./src/routes/employeeRoute");




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
//mongodb+srv://root:root@opmcluster.dvzi5iq.mongodb.net/?retryWrites=true&w=majority
//=========== connecting to database ==============
mongoose.set("strictQuery", true);
mongoose   
  .connect(
    "mongodb://localhost:27017/gbs",
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

app.use("/user", userRoute);
app.use("/client", clientRoute);
app.use("/employee", employeeRoute);


// ======== exporting app ========
module.exports = app;
