const bookingModel = require("../../model/booking");
const cityModel = require("../../model/city");
const customerModel = require("../../model/customer");
const districtModel = require("../../model/district");
const planModel = require("../../model/plan");
const serviceModel = require("../../model/service");
const servicemanModel = require("../../model/serviceman");
const stateModel = require("../../model/state");

// get home items
exports.getHomeItems = async function (req, res) {
  try {
    const assignBooking = await serviceModel
      .find({
        servicemanId: req.userId,
        status: "assigned"
      })
      .countDocuments();

    const ongoingBooking = await serviceModel
      .find({
        servicemanId: req.userId,
        status: "inProgress"
      })
      .countDocuments();

    const completedBooking = await serviceModel
      .find({
        servicemanId: req.userId,
        status: "completed"
      })
      .countDocuments();

    const canceledBooking = await serviceModel
      .find({
        servicemanId: req.userId,
        status: "canceled"
      })
      .countDocuments();

    const labels = ["Assigned", "On Going", "Completed", "Canceled"];
    const values = [
      assignBooking,
      ongoingBooking,
      completedBooking,
      canceledBooking
    ];

    res.status(200).json({
      success: true,
      message: "Services have been retrieved successfully",
      assignBooking: assignBooking,
      ongoingBooking: ongoingBooking,
      completedBooking: completedBooking,
      canceledBooking: canceledBooking,
      labels: labels,
      values: values
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
