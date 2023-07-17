const bookingModel = require("../../model/booking");
const customerModel = require("../../model/customer");
const vendorModel = require("../../model/franchise");
const planModel = require("../../model/plan");
const serviceModel = require("../../model/service");
const servicemanModel = require("../../model/serviceman");

// booking report
exports.bookingReport = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.body.searchQuery, "i");

    if (req.body.searchQuery !== "") {
      condition = {
        $or: [
          { userName: regex },
          { franchiseName: regex },
          { franchisePhone: regex },
          { planName: regex },
          { orderId: regex },
          { transactionId: regex },
          { subscribeDate: regex },
          { expiryDate: regex },
        ],
      };
    }
    condition.franchiseId = req.userId;

    var dates = req.body.logCreatedDate;

    if (dates.length > 1) {
      condition.logCreatedDate = {
        $gte: dates[0] + "T00:00:00.000Z",
        $lte: dates[1] + "T23:59:59.999Z",
      };
    } else if (dates.length == 1) {
      condition.logCreatedDate = dates[0] + "T00:00:00.000Z";
    }
    console.log(condition);

    const booking = await bookingModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    let bookingExcel = [];
    booking.map((val) => {
      let obj = {
        "Customer Name": val.userName,
        "Franchise Name": val.franchiseName,
        "Franchise Phone Number": val.franchisePhone,
        "Plan Name": val.planName,
        "Plan Duration": val.planPriod,
        "Plan Amount": val.planAmount,
        "Tax Applicable": val.tax,
        "Total Amount": val.totalAmount,
        "Order ID": val.orderId,
        "Transaction ID": val.transactionId,
        "Subscribe Date": val.subscribeDate,
        "Expiry Date": val.expiryDate,
        "Booking Status": val.status,
        "Booking Date": val.logCreatedDate,
      };

      bookingExcel.push(obj);
    });

    res.status(200).json({
      success: true,
      message: "Booking report data has been retrieved successfully",
      bookingReport: booking,
      bookingExcel: bookingExcel,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// service report
exports.serviceReport = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.body.searchQuery, "i");

    if (req.body.searchQuery !== "") {
      condition = {
        $or: [
          { userName: regex },
          { franchiseName: regex },
          { franchisePhone: regex },
          { servicemanName: regex },
          { servicemanPhone: regex },
          { status: regex },
        ],
      };
    }
    condition.franchiseId = req.userId;

    var dates = req.body.logCreatedDate;

    if (dates.length > 1) {
      condition.logCreatedDate = {
        $gte: dates[0] + "T00:00:00.000Z",
        $lte: dates[1] + "T23:59:59.999Z",
      };
    } else if (dates.length == 1) {
      condition.logCreatedDate = dates[0] + "T00:00:00.000Z";
    }
    console.log(condition);

    const service = await serviceModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    let serviceExcel = [];
    service.map((val) => {
      let obj = {
        "Customer Name": val.userName,
        "Franchise Name": val.franchiseName,
        "Franchise Phone Number": val.franchisePhone,
        "Serviceman Name": val.servicemanName,
        "Serviceman Phone Number": val.servicemanPhone,
        "Service Base Amount": val.serviceAmount,
        "Tax Applicable": val.tax,
        "Total Amount": val.totalAmount,
        "Service ID": val.serviceId,
        "Service Status": val.status,
        "Service Raise Date": val.logCreatedDate,
      };

      serviceExcel.push(obj);
    });

    res.status(200).json({
      success: true,
      message: "Service report data has been retrieved successfully",
      serviceReport: service,
      serviceExcel: serviceExcel,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
