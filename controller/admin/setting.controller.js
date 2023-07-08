const settingModel = require("../../model/setting");

// get settings
exports.getSetting = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const setting = await settingModel.findOne();

    if (setting === null) {
      const obj = new settingModel({
        termsAndCondition: "",
        refundPolicy: "",
        privacyPolicy: "",
        aboutUs: "",
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });
      const saveObj = await obj.save();
      if (saveObj) {
        return res.status(200).json({
          success: true,
          message: "Settings retrieved successfully",
          setting: saveObj ?? {}
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Settings could not be retrieved" });
      }
    } else {
      return res.status(200).json({
        success: true,
        message: "Settings retrieved successfully",
        setting: setting
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// update AboutUs
exports.updateAboutUs = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const upSet = await settingModel.updateOne(
      {},
      {
        $set: {
          aboutUs: req.body.aboutUs,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (upSet) {
      return res.status(200).json({
        success: true,
        message: "About us has been updated successfully"
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "About us could not be updated" });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};

// update termsCondition
exports.updateTermsCondition = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const upSet = await settingModel.updateOne(
      {},
      {
        $set: {
          termsAndCondition: req.body.termsAndCondition,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (upSet) {
      return res.status(200).json({
        success: true,
        message: "Terms & Conditions has been updated successfully"
      });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Terms & Conditions could not be updated"
        });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};

// update PrivacyPolicy
exports.updatePrivacyPolicy = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const upSet = await settingModel.updateOne(
      {},
      {
        $set: {
          privacyPolicy: req.body.privacyPolicy,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (upSet) {
      return res.status(200).json({
        success: true,
        message: "Privacy policy has been updated successfully"
      });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Privacy policy could not be updated"
        });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};

// update RefundPolicy
exports.updateRefundPolicy = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const upSet = await settingModel.updateOne(
      {},
      {
        $set: {
          refundPolicy: req.body.refundPolicy,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (upSet) {
      return res.status(200).json({
        success: true,
        message: "Refund Policy has been updated successfully"
      });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Refund Policy could not be updated"
        });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};
