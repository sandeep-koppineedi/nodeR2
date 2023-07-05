const mongoose = require("mongoose");
const paymentGateway = new mongoose.Schema({
  merchantApiKey: {
    type: String
  },
  solveKey: {
    type: String
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("paymentGateways", paymentGateway);
