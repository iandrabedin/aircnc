const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
  thumbail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Spot", SpotSchema);
