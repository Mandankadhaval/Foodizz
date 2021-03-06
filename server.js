const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/database");
const app = express();
const recipes = require("./routes/recipes");
const User=require("./routes/users")
const jwt = require("jsonwebtoken");
const paginate = require('express-paginate');
const cors = require('cors');
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
app.use(cors());
app.set('view engine', 'ejs');
app.set("secretKey", "Foodizz");
app.use(bodyParser.json({limit:"50mb"}));
app.use(paginate.middleware(10, 50));
app.use("/recipes", recipes);
app.use("/user",User);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
    console.log("error", err);
    if (err.status === 404) res.status(404).json({ message: "Not found" });
    else res.status(500).json({ message: err.message });
  });
  
app.listen(3000, function () {
  console.log("Node server listening on port 3000");
});

