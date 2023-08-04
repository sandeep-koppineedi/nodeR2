const mongoose = require("mongoose");
const booking = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  userName: {
    type: String,
    default: ""
  },
  userPhone: {
    type: String,
    default: ""
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
  servicemanId: {
    type: mongoose.Schema.Types.ObjectId
  },
  servicemanName: {
    type: String
  },
  servicemanPhone: {
    type: String
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId
  },
  planName: {
    type: String
  },
  planPriod: {
    type: String
  },
  planAmount: {
    type: String
  },
  tax: {
    type: String
  },
  totalAmount: {
    type: String
  },
  orderId: {
    type: String
  },
  transactionId: {
    type: String
  },
  subscribeDate: {
    type: String
  },
  expiryDate: {
    type: String
  },
  status: {
    type: String,
    enum: [
      "pending",
      "accepted",
      "assigned",
      "inProgress",
      "completed",
      "canceled"
    ],
    default: "pending"
  },
  cancelReason: {
    type: String
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("bookings", booking);
