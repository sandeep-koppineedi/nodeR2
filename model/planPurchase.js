const mongoose = require("mongoose");

const purchasePlan = new mongoose.Schema({
  planId: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    trim: true,
    index: true
  },
  totalPrice: {
    type: String
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId
  },
  customerName: {
    type: String
  },
  customerPhone: {
    type: String
  },
  purchaseDate: {
    type: String
  },
  expiryDate: {
    type: String
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("purchasePlans", purchasePlan);
