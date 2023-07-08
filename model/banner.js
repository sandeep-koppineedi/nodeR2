// defining the mongoose schema
const mongoose = require("mongoose");

const banner = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  bannerMedia: {
    type: String,
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("banners", banner);
