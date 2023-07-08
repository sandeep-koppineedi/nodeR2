// import models
const bannerModel = require("../../model/banner");

// add event
exports.addBanner = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const bannerObj = new bannerModel({
      title: req.body.title,
      description: req.body.description,
      bannerMedia: req.file ? req.file.path : "",
      logCreatedDate: logDate,
      logModifiedDate: logDate
    });
    const saveBanner = await bannerObj.save();
    if (saveBanner) {
      return res.status(200).json({
        success: true,
        message: "Banner has been added successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Banner could not be added"
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message ?? "Something went wrong!"
    });
  }
};

// get all Events
exports.getAllBanner = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");

    if (req.query.searchQuery != "") {
      condition = {
        $or: [{ title: regex }, { description: regex }]
      };
    }
    console.log(condition);

    const bannerResult = await bannerModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Banner data retrieved successfully",
      bannerResult: bannerResult
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get Event details
exports.getBannerDetails = async function (req, res) {
  try {
    const bannerResult = await bannerModel.findOne({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "Banner data retrieved successfully",
      bannerResult: bannerResult ?? {}
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// update Event
exports.editBanner = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const bannerResult = await bannerModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          bannerMedia: req.file ? req.file.path : console.log("No Img"),
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (bannerResult) {
      res.status(200).json({
        success: true,
        message: "Banner data has been updated successfully"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};

// delete Event
exports.deleteBanner = async function (req, res) {
  try {
    const bannerResult = await bannerModel.findOneAndDelete({
      _id: req.params.id
    });

    if (bannerResult) {
      res.status(200).json({
        success: true,
        message: "Banner data has been removed successfully"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};
