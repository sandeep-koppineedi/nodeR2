const mongoose = require("mongoose");

const customer = new mongoose.Schema({
  customerName: {
    type: String,
    trim: true,
    index: true
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  address: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  isdelete: {
    type: String,
    enum: ["Yes", "No"],
    default: "No"
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("customers", customer);
