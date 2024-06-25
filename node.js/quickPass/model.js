const mongoose = require("mongoose");

const myWay = mongoose.Schema({
  name: String,
});
mongoose.model("myWay", myWay);
