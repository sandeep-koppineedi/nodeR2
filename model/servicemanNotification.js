// defining the mongoose schema
const mongoose = require("mongoose");

const servicemanNotification = new mongoose.Schema({
  department: {
    type: String
  },
  users: {
    type: Array
  },
  title: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  notifImg: {
    type: String,
    default: "uploads/public/notif_icon.png"
  },
  status: {
    type: Boolean,
    enum: [false, true],
    default: true
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("servicemanNotifications", servicemanNotification);
