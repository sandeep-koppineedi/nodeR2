const mongoose = require("mongoose");

const servicemanRating = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  customerName: {
    type: String,
  },
  customerPhone: {
    type: String,
  },
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  servicemanName: {
    type: String,
  },
  servicemanPhone: {
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
  rating: {
    type: String,
  },
  logCreatedDate: {
    type: String,
  },
  logModifiedDate: {
    type: String,
  },
});

module.exports = mongoose.model("servicemanRatings", servicemanRating);
