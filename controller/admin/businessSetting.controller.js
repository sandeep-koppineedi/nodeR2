const businessSettingModel = require("../../model/businessSetting");

// get BusinessSetting
exports.getBusinessSetting = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const business = await businessSettingModel.findOne({});

    if (business === null) {
      const payObj = new businessSettingModel({
        companyName: "",
        companyEmail: "",
        companySupportEmail: "",
        companyLogo: "",
        companyAddress: "",
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });
      payObj.save();

      const data = await businessSettingModel.findOne({});

      return res.status(200).json({
        success: true,
        message: "Business setting has been retrieved successfully",
        businessSetting: data ?? {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Business setting has been retrieved successfully",
        businessSetting: business ?? {}
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// edit BusinessSetting
exports.editBusinessSetting = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const state = await businessSettingModel.updateOne(
      {},
      {
        $set: {
          companyName: req.body.companyName,
          companyEmail: req.body.companyEmail,
          companySupportEmail: req.body.companySupportEmail,
          companyLogo: req.file ? req.file.path : console.log("No Img"),
          companyAddress: req.body.companyAddress,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (state) {
      res.status(200).json({
        success: true,
        message: "Business setting has been updated successfully"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};
