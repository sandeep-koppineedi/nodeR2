const payGatewayModel = require("../../model/paymentGateway");

// get paymentGateway
exports.getpaymentGateway = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const payment = await payGatewayModel.findOne({});

    if (payment === null) {
      const payObj = new payGatewayModel({
        merchantApiKey: "",
        solveKey: "",
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });
      payObj.save();

      const data = await payGatewayModel.findOne({});

      return res.status(200).json({
        success: true,
        message: "Payment gateway has been retrieved successfully",
        paymentGateway: data ?? {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Payment gateway has been retrieved successfully",
        paymentGateway: payment ?? {}
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// edit paymentGateway
exports.editpaymentGateway = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const state = await payGatewayModel.updateOne(
      {},
      {
        $set: {
          merchantApiKey: req.body.merchantApiKey,
          solveKey: req.body.solveKey,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (state) {
      res.status(200).json({
        success: true,
        message: "Payment gateway has been updated successfully"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};
