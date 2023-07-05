const couponModel = require("../../model/coupon");

// add coupon
exports.addCoupon = async function (req, res) {
  try {
    // const copn = couponModel.findOne({ couponCode: req.body.couponCode });

    // if (copn) {
    //   return res.status(400).json({ message: "Coupon already exist!" });
    // } else {
    const logDate = new Date().toISOString();

    const cpnObj = new couponModel({
      title: req.body.title,
      couponCode: req.body.couponCode,
      couponCodeType: req.body.couponCodeType,
      amount: req.body.amount ? req.body.amount : console.log("No amount"),
      percentDiscount: req.body.percentDiscount
        ? req.body.percentDiscount
        : console.log("No percent"),
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      description: req.body.description,
      logDateCreated: logDate,
      logDateModified: logDate
    });

    const saveCpn = await cpnObj.save();

    if (saveCpn) {
      return res
        .status(200)
        .json({ message: "Coupon has been added successfully" });
    } else {
      return res.status(400).json({ message: "Coupon could not be added" });
    }
    // }
  } catch (err) {
    res.status(400).json({ message: err.message ?? "Something went wrong!" });
  }
};

// get coupon details
exports.getCouponDetails = async function (req, res) {
  try {
    const cpnResult = await couponModel.findOne({
      couponCode: req.body.couponCode
    });

    res
      .status(200)
      .json({ message: "Success", cpnResult: cpnResult ? cpnResult : {} });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// get all coupons
exports.getAllCoupons = async function (req, res) {
  try {
    let regex = new RegExp(req.query.searchQuery, "i");

    const cpnResult = await couponModel
      .find({
        $or: [{ title: regex }, { couponCode: regex }]
      })
      .sort({ logDateCreated: -1 });

    res.status(200).json({ message: "Success", cpnResult });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

// update coupon
exports.editCoupon = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const updateReslt = await couponModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          couponCode: req.body.couponCode,
          couponCodeType: req.body.couponCodeType,
          amount: req.body.amount ? req.body.amount : console.log("No amount"),
          percentDiscount: req.body.percentDiscount
            ? req.body.percentDiscount
            : console.log("No percent"),
          fromDate: req.body.fromDate,
          toDate: req.body.toDate,
          description: req.body.description,
          //   status: req.body.status,
          logDateModified: logDate
        }
      },
      { new: true }
    );

    if (updateReslt) {
      res.status(200).json({ message: "Coupon has been updated sucessfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};

// remove coupon
exports.removeCoupon = async function (req, res) {
  try {
    const remveResult = await couponModel.findByIdAndDelete({
      _id: req.params.id
    });

    if (remveResult) {
      res.status(200).json({ message: "Coupon has been removed successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong..!" });
  }
};
