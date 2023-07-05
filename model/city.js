const mongoose = require("mongoose");
const city = new mongoose.Schema({
  title: {
    type: String,
    required: true
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
  isdeleted: {
    type: String,
    enum: ["No", "Yes"],
    default: "No"
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("citys", city);
