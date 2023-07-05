const mongoose = require("mongoose");

const plan = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    index: true
  },
  planType: {
    type: String,
    enum: ["", "solo", "couple", "family", "unlimited"]
  },
  planImage: {
    type: String
  },
  oneMonthLiters: {
    type: String,
    trim: true
  },
  oneMonthPrice: {
    type: String,
    trim: true
  },
  threeMonthLiters: {
    type: String,
    trim: true
  },
  threeMonthPrice: {
    type: String,
    trim: true
  },
  sixMonthLiters: {
    type: String,
    trim: true
  },
  sixMonthPrice: {
    type: String,
    trim: true
  },
  twelveMonthLiters: {
    type: String,
    trim: true
  },
  twelveMonthPrice: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  planAdvantages: {
    // {info: "xyz", advantage: "abc"}
    type: Array
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

module.exports = mongoose.model("plans", plan);
