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

    const customer = await customerModel.findOne(
      { _id: req.userId },
      {
        customerName: 1,
        phone: 1,
        franchiseId: 1,
        franchiseName: 1,
        franchisePhone: 1,
        servicemanId: 1,
        servicemanName: 1,
        servicemanPhone: 1,
      }
    );

    const serveObj = new serviceModel({
      userId: req.userId, // in actual this is customer app API. so use req.userId
      userName: customer ? customer.customerName : "",
      userPhone: customer ? customer.phone : "",
      servicemanId: customer
        ? customer.servicemanId
        : console.log("No serviceman id"),
      servicemanName: customer ? customer.servicemanName : "",
      servicemanPhone: customer ? customer.servicemanPhone : "",
      franchiseId: customer
        ? customer.franchiseId
        : console.log("No franchise id"),
      franchiseName: customer ? customer.franchiseName : "",
      franchisePhone: customer ? customer.franchisePhone : "",
      bookingId: req.body.bookingId,
      serviceAmount: req.body.serviceAmount,
      tax: req.body.tax,
      totalAmount: req.body.totalAmount,
      serviceId: "KNV" + randomNumber,
      status: "pending",
      logCreatedDate: logDate,
      logModifiedDate: logDate
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

// get all Services
exports.getAllServices = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery) {
      condition = {
        $or: [{ userName: regex }, { status: regex }, { serviceId: regex }]
      };
    }
    console.log(condition);

    const data = await serviceModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Services have been retrieved successfully",
      serviceResult: data
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};
