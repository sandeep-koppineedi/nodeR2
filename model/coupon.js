const mongoose = require("mongoose");
const coupon = mongoose.Schema({
  title: {
    type: String,
  },
  couponCode: {
    type: String,
    required: true,
    index: true,
    trim: true,
  },
  couponCodeType: {
    type: String,
    enum: ["price", "percentage"]
  },
  amount: {
    type: String,
    default: ""
  },
  percentDiscount: {
    type: String,
    default: ""
  },
  fromDate: {
    type: String
  },
  toDate: {
    type: String
  },
  description: {
    type: String
  },
  logDateCreated: {
    type: String
  },
  logDateModified: {
    type: String
  },
  status: {
    type: Boolean,
    enum: [false, true],
    default: true
  }
});

module.exports = mongoose.model("coupons", coupon);
