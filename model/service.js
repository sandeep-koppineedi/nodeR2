const mongoose = require("mongoose");
const service = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  userName: {
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
  bookingId: {
    type: mongoose.Schema.Types.ObjectId
  },
  serviceAmount: {
    type: String
  },
  tax: {
    type: String
  },
  totalAmount: {
    type: String
  },
  serviceId: {
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

module.exports = mongoose.model("services", service);
