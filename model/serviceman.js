const mongoose = require("mongoose");

const serviceman = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    index: true
  },
  lastName: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  aadhaarNumber: {
    type: String,
    trim: true
  },
  franchiseId: {
    type: mongoose.Schema.Types.ObjectId
  },
  franchiseName: {
    type: String
  },
  franchisePhone: {
    type: String
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId
  },
  stateName: {
    type: String
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId
  },
  districtName: {
    type: String
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId
  },
  cityName: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  profilePic: {
    type: String
  },
  idImage: {
    type: String
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

module.exports = mongoose.model("servicemans", serviceman);
