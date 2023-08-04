// defining the mongoose schema
const mongoose = require("mongoose");

const banner = new mongoose.Schema({
  deviceName: {
    type: String,
    trim: true,
    index: true,
    required: true
  },
  device_id: {
    type: String
  },
  devicePlan: {
    type: String,
  },
  franchiseId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  franchiseName: {
    type: String,
  },
  franchisePhone: {
    type: String,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  customerName: {
    type: String,
  },
  customerPhone: {
    type: String,
  },
  installationDate: {
    type: String,
  },
  expiryDate: {
    type: String,
  },
  deviceImage: {
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
