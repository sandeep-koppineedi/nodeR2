const mongoose = require("mongoose");
const businessSetting = new mongoose.Schema({
  companyName: {
    type: String
  },
  companyEmail: {
    type: String
  },
  companySupportEmail: {
    type: String
  },
  companyLogo: {
    type: String,
    default: ""
  },
  companyAddress: {
    type: String
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("businessSettings", businessSetting);
