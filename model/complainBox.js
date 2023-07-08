const mongoose = require("mongoose");
const complaint = new mongoose.Schema({
  title: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  userName: {
    type: String,
    default: ""
  },
  userPhone: {
    type: String
  },
  ticketId: {
    type: String
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
  status: {
    type: String,
    enum: ["pending", "completed", "rejected"],
    default: "pending"
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("complaints", complaint);
