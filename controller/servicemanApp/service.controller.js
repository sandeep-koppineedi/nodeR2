const bookingModel = require("../../model/booking");
const cityModel = require("../../model/city");
const customerModel = require("../../model/customer");
const districtModel = require("../../model/district");
const planModel = require("../../model/plan");
const serviceModel = require("../../model/service");
const servicemanModel = require("../../model/serviceman");
const stateModel = require("../../model/state");

// getAll service to serviceman
exports.getAllServices = async function (req, res) {
  try {
    const assignBooking = await serviceModel.find({
      servicemanId: req.userId,
      status: "assigned"
    });

    const ongoingBooking = await serviceModel.find({
      servicemanId: req.userId,
      status: "inProgress"
    });

    const completedBooking = await serviceModel.find({
      servicemanId: req.userId,
      status: "completed"
    });

    const canceledBooking = await serviceModel.find({
      servicemanId: req.userId,
      status: "canceled"
    });

    res.status(200).json({
      success: true,
      message: "Services have been retrieved successfully",
      assignBooking: assignBooking,
      ongoingBooking: ongoingBooking,
      completedBooking: completedBooking,
      canceledBooking: canceledBooking
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// ongoing service to serviceman
exports.ongoingService = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const Booking = await serviceModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "inProgress",
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (Booking) {
      res.status(200).json({
        success: true,
        message: "Service status has been updated successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// completed service to serviceman
exports.completedService = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const Booking = await serviceModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "completed",
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (Booking) {
      res.status(200).json({
        success: true,
        message: "Service status has been updated successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// cancel service to serviceman
exports.cancelService = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const Booking = await serviceModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "canceled",
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (Booking) {
      res.status(200).json({
        success: true,
        message: "Service status has been updated successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
