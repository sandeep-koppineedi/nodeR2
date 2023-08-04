// import model
const customerModel = require("../../model/customer");
const franchiseModel = require("../../model/franchise");
const serviceModel = require("../../model/service");
const servicemanModel = require("../../model/serviceman");
const servicemanRatingModel = require("../../model/servicemanRating");

// add a Service
exports.addService = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const todaye = new Date().toISOString().slice(0, 10);

    // let randomDate = Date.now();
    // let randomNumber = randomDate.toString().slice(5, 13);
    const customer = await customerModel.findOne(
      { _id: req.userId },
      { customerName: 1, phone: 1 }
    );
    const serviceMan = await servicemanModel.findOne(
      { _id: req.body.servicemanId },
      {
        firstName: 1,
        lastName: 1,
        phone: 1,
        franchiseId: 1,
        franchiseName: 1,
        franchisePhone: 1,
      }
    );

    const serveObj = new servicemanRatingModel({
      customerId: req.userId,
      customerName: customer ? customer.customerName : "",
      customerPhone: customer ? customer.phone : "",
      servicemanId: req.body.servicemanId,
      servicemanName: serviceMan
        ? `${serviceMan.firstName} ${serviceMan.lastName}`
        : "",
      servicemanPhone: serviceMan ? serviceMan.phone : "",
      franchiseId: serviceMan
        ? serviceMan.franchiseId
        : console.log("No franchise id"),
      franchiseName: serviceMan ? serviceMan.franchiseName : "",
      franchisePhone: serviceMan ? serviceMan.franchisePhone : "",
      rating: req.body.rating,
      logCreatedDate: logDate,
      logModifiedDate: logDate,
    });

    const saveServe = await serveObj.save();
    if (saveServe) {
      res.status(200).json({ message: "Serviceman rating given successfully" });
    } else {
      res.status(400).json({ message: "Serviceman rating could not be added!" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};
