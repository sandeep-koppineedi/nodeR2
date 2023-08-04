const bookingModel = require("../../model/booking");
const cityModel = require("../../model/city");
const customerModel = require("../../model/customer");
const districtModel = require("../../model/district");
const planModel = require("../../model/plan");
const serviceModel = require("../../model/service");
const stateModel = require("../../model/state");

// add a Service
exports.addService = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const todaye = new Date().toISOString().slice(0, 10);

    let randomDate = Date.now();
    let randomNumber = randomDate.toString().slice(5, 13);

    const serveObj = new serviceModel({
      userId: req.body.userId, // in actual this is customer app API. so use req.userId
      userName: req.body.userName,
      bookingId: req.body.bookingId,
      serviceAmount: req.body.serviceAmount,
      tax: req.body.tax,
      totalAmount: req.body.totalAmount,
      serviceId: "KNV" + randomNumber,
      status: "pending",
      logCreatedDate: logDate,
      logModifiedDate: logDate,
    });

    const saveServe = await serveObj.save();
    if (saveServe) {
      res.status(200).json({ message: "Service initiated successfully" });
    } else {
      res.status(400).json({ message: "Service could not be added!" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

// get all panding Services
exports.getAllPendingServices = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { status: regex }, { serviceId: regex }],
      };
    }
    condition.status = "pending";
    console.log(condition);

    const data = await serviceModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Services have been retrieved successfully",
      serviceResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all accepted Services
exports.getAllAcceptedServices = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { status: regex }, { serviceId: regex }],
      };
    }
    condition.status = "accepted";
    console.log(condition);

    const data = await serviceModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Services have been retrieved successfully",
      serviceResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// get all completed Services
exports.getAllCompletedServices = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { status: regex }, { serviceId: regex }],
      };
    }
    condition.status = "completed";
    console.log(condition);

    const data = await serviceModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Services have been retrieved successfully",
      serviceResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// update service status
exports.updateStatus = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const upStatus = await serviceModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
          logModifiedDate: logDate,
        },
      },
      { new: true }
    );

    if (upStatus) {
      res.status(200).json({
        success: true,
        message: "Service status has been updated successfully",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!",
    });
  }
};
