const bookingModel = require("../../model/booking");
const cityModel = require("../../model/city");
const customerModel = require("../../model/customer");
const districtModel = require("../../model/district");
const planModel = require("../../model/plan");
const serviceModel = require("../../model/service");
const servicemanModel = require("../../model/serviceman");
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

// get all PendingServices
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
    condition.franchiseId = req.userId;
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

// get all CompletedServices
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
    condition.franchiseId = req.userId;
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

// get Service details
exports.getService = async function (req, res) {
  try {
    const data = await serviceModel.find({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "Service details have been retrieved successfully",
      serviceResult: data,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// edit ServiceStatus
exports.editServiceStatus = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const Booking = await serviceModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
          logModifiedDate: logDate,
        },
      },
      { new: true }
    );

    if (Booking) {
      res.status(200).json({
        success: true,
        message: "Service status has been updated successfully",
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// assign service to serviceman
exports.assignService = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const serviceman = await servicemanModel.findOne(
      { _id: req.body.servicemanId },
      { firstName: 1, lastName: 1, phone: 1 }
    );

    const Booking = await serviceModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          servicemanId: req.body.servicemanId,
          servicemanName: serviceman
            ? `${serviceman.firstName} ${serviceman.lastName}`
            : "",
          servicemanPhone: serviceman ? serviceman.phone : "",
          status: "assigned",
          logModifiedDate: logDate,
        },
      },
      { new: true }
    );

    if (Booking) {
      res.status(200).json({
        success: true,
        message: "Service status has been updated successfully",
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
