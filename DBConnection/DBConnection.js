const mongoose = require("mongoose");

 mongoose.connect('mongodb://localhost:27017/ProductBackends').then(() => {
  console.log("DataBase is Connected");
 })