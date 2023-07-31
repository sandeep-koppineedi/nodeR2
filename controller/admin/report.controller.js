const bookingModel = require("../../model/booking");
const customerModel = require("../../model/customer");
const vendorModel = require("../../model/franchise");
const planModel = require("../../model/plan");
const serviceModel = require("../../model/service");
const servicemanModel = require("../../model/serviceman");

// serviceman report
exports.servicemanReport = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.body.searchQuery, "i");

    if (req.body.searchQuery !== "") {
      condition = {
        $or: [
          { firstName: regex },
          { lastName: regex },
          { phone: regex },
          { aadhaarNumber: regex },
          { franchiseName: regex },
          { stateName: regex },
          { districtName: regex },
          { cityName: regex },
          { email: regex },
        ],
      };
    }
    condition.isdelete = "No";

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

    const serviceman = await servicemanModel
      .find(condition, { password: 0, notificationBell: 0 })
      .sort({ logCreatedDate: -1 });

    let servicemanExcel = [];
    serviceman.map((val) => {
      let obj = {
        "First Name": val.firstName,
        "Last Name": val.lastName,
        "Phone Number": val.phone,
        "Email ID": val.email,
        "Aadhaar Number": val.aadhaarNumber,
        "Franchise Name": val.franchiseName,
        "Franchise Phone": val.franchisePhone,
        "State Name": val.stateName,
        "District Name": val.districtName,
        "City Name": val.cityName,
        "Complete Address": val.address,
        "Joining Date": val.logCreatedDate,
      };

      servicemanExcel.push(obj);
    });

    res.status(200).json({
      success: true,
      message: "Serviceman report data has been retrieved successfully",
      serviceman: serviceman,
      servicemanExcel: servicemanExcel,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// customer report
exports.customerReport = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.body.searchQuery, "i");

    if (req.body.searchQuery !== "") {
      condition = {
        $or: [
          { customerName: regex },
          { phone: regex },
          { email: regex },
          { franchiseName: regex },
          { servicemanName: regex },
        ],
      };
    }
    condition.isdelete = "No";

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

    const customer = await customerModel
      .find(condition, { password: 0, notificationBell: 0 })
      .sort({ logCreatedDate: -1 });

    let customerExcel = [];
    customer.map((val) => {
      let obj = {
        "Customer Name": val.customerName,
        "Phone Number": val.phone,
        "Email ID": val.email,
        "Customer Address": val.address,
        "Franchise Name": val.franchiseName,
        "Franchise Phone": val.franchisePhone,
        "Serviceman Name": val.servicemanName,
        "Serviceman Phone": val.servicemanPhone,
        "Joining Date": val.logCreatedDate,
      };

      customerExcel.push(obj);
    });

    res.status(200).json({
      success: true,
      message: "Customer report data has been retrieved successfully",
      customer: customer,
      customerExcel: customerExcel,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// franchise report
exports.franchiseReport = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.body.searchQuery, "i");

    if (req.body.searchQuery !== "") {
      condition = {
        $or: [
          { companyName: regex },
          { companyPhone: regex },
          { supportEmail: regex },
          { bookingEmail: regex },
          { stateName: regex },
          { districtName: regex },
          { cityName: regex },
          { email: regex },
          { phone: regex },
        ],
      };
    }
    condition.status = "active";

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

    const vendor = await vendorModel
      .find(condition, { password: 0 })
      .sort({ logCreatedDate: -1 });

    let vendorExcel = [];
    vendor.map((val) => {
      let obj = {
        "Company Name": val.companyName,
        "Company Phone Number": val.companyPhone,
        "Support Email": val.supportEmail,
        "Booking Email": val.bookingEmail,
        "State Name": val.stateName,
        "District Name": val.districtName,
        "City Name": val.cityName,
        "Company Address": val.address,
        "Company GST Number": val.companyGstNumber,
        "Franchise User Name": val.userName,
        "Franchise Email": val.email,
        "Franchise Phone": val.phone,
        "Joining Date": val.logCreatedDate,
      };

      vendorExcel.push(obj);
    });

    res.status(200).json({
      success: true,
      message: "Franchise report data has been retrieved successfully",
      vendor: vendor,
      vendorExcel: vendorExcel,
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

    bookingExcel = bookingExcel.sort((a, b) => {
      return a["Booking Date"] > b["Booking Date"] ? -1 : 1;
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

// expiring report
exports.bookingExpiringReport = async function (req, res) {
  try {
    const todayDate = new Date().toISOString().slice(0, 10);
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    const threeDaysFromNowString = threeDaysFromNow.toISOString().slice(0, 10);

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
    condition.status = "completed";
    condition.expiryDate = { $gte: todayDate, $lte: threeDaysFromNowString };

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

    bookingExcel = bookingExcel.sort((a, b) => {
      return a["Booking Date"] > b["Booking Date"] ? -1 : 1;
    });

    res.status(200).json({
      success: true,
      message: "Booking report data has been retrieved successfully",
      bookingExpiringReport: booking,
      bookingExpiringExcel: bookingExcel,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
