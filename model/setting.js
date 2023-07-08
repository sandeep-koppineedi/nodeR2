const mongoose = require("mongoose");
const setting = new mongoose.Schema({
  termsAndCondition: {
    type: String
  },
  refundPolicy: {
    type: String
  },
  privacyPolicy: {
    type: String
  },
  aboutUs: {
    type: String
  },
  logCreatedDate: {
    type: String
  },
  logModifiedDate: {
    type: String
  }
});

module.exports = mongoose.model("settings", setting);
