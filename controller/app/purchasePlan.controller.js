const customerModel = require("../../model/customer");
const planModel = require("../../model/plan");
const planPurchaseModel = require("../../model/planPurchase");

// fake api to create purchases by an customer
exports.addPurchase = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const plan = await planModel.findOne(
      { _id: req.body.planId },
      { title: 1 }
    );
    const customer = await customerModel.findOne(
      { _id: req.userId },
      { customerName: 1, phone: 1 }
    );

    const puchaseObj = new planPurchaseModel({
      planId: req.body.planId,
      title: plan ? plan.title : "",
      totalPrice: req.body.totalPrice,
      customerId: req.userId,
      customerName: customer ? customer.customerName : "",
      customerPhone: customer ? customer.phone : "",
      purchaseDate: req.body.purchaseDate,
      expiryDate: req.body.expiryDate,
      logCreatedDate: logDate,
      logModifiedDate: logDate
    });

    const savePuchase = await puchaseObj.save();
    if (savePuchase) {
      return res.status(200).json({ success: true, message: "Success" });
    } else {
      return res.status(400).json({ success: false, message: "Unsuccessfull" });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};

// get all plan purchases
exports.getAllPurchases = async function (req, res) {
  try {
    const purchase = await planPurchaseModel.find({ customerId: req.userId });

    res.status(200).json({
      success: true,
      message: "Plan purchase list has been retrieved successfully",
      purchase: purchase
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
