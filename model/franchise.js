const mongoose = require("mongoose");

const franchise = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
    index: true
  },
  companyPhone: {
    type: String
  },
  supportEmail: {
    type: String
  },
  bookingEmail: {
    type: String,
    trim: true
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
    type: String,
    trim: true
  },
  companyGstNumber: {
    type: String,
    trim: true
  },
  companyIdImage: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
  userName: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
    type: String
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("franchises", franchise);
