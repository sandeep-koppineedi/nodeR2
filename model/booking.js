const mongoose = require("mongoose");
const booking = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  userName: {
    type: String,
    default: ""
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
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("bookings", booking);
