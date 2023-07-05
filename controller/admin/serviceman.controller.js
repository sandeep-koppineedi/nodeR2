// import libraries
const bcrypt = require("bcrypt");

// import model
const cityModel = require("../../model/city");
const districtModel = require("../../model/district");
const franchiseModel = require("../../model/franchise");
const stateModel = require("../../model/state");
const servicemanModel = require("../../model/serviceman");

// add plan
exports.addServiceman = async function (req, res) {
  try {
    const serve = await servicemanModel.findOne({
      $and: [
        { isdelete: "No" },
        {
          $or: [{ phone: req.body.phone }, { email: req.body.email }]
        }
      ]
    });

    if (serve) {
      return res
        .status(400)
        .json({ success: false, message: "Serviceman already exists!" });
    } else {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Password and confirm password does not match!"
        });
      }

      const stater = await stateModel.findOne(
        { _id: req.body.stateId },
        { title: 1 }
      );
      const distr = await districtModel.findOne(
        { _id: req.body.districtId },
        { title: 1 }
      );
      const cityr = await cityModel.findOne(
        { _id: req.body.cityId },
        { title: 1 }
      );

      const logDate = new Date().toISOString();
      const pass = bcrypt.hashSync(req.body.password, 10);

      const serveObj = new servicemanModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        aadhaarNumber: req.body.aadhaarNumber,
        stateId: req.body.stateId,
        stateName: stater ? stater.title : "",
        districtId: req.body.districtId,
        districtName: distr ? distr.title : "",
        cityId: req.body.cityId,
        cityName: cityr ? cityr.title : "",
        address: req.body.address,
        email: req.body.email,
        password: pass,
        profilePic: req.files.profilePic
          ? req.files.profilePic[0].path
          : "uploads/public/userLogo.png",
        idImage: req.files.idImage ? req.files.idImage[0].path : "",
        isdelete: "No",
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });
      const saveServe = await serveObj.save();
      if (saveServe) {
        return res.status(200).json({
          success: true,
          message: "Serviceman has been added successfully"
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Serviceman could not be added"
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message ?? "Something went wrong!"
    });
  }
};

// get all plans list
exports.getAllServicemans = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery !== "") {
      condition = {
        $or: [
          { firstName: regex },
          { lastName: regex },
          { aadhaarNumber: regex },
          { phone: regex },
          { email: regex }
        ]
      };
    }
    condition.isdelete = "No";
    console.log(condition);

    const result = await servicemanModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Servicemen have been retrieved successfully",
      serviceResult: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Bad request"
    });
  }
};

// get Customer
exports.getCustomer = async function (req, res) {
  try {
    const result = await servicemanModel.find({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "Serviceman data has been retrieved successfully",
      serviceResult: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Bad request"
    });
  }
};

// edit Customer
exports.editCustomer = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const result = await servicemanModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          customerName: req.body.customerName,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
          profilePic: req.file ? req.file.path : console.log("No Img"),
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Customer has been updated successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Customer could not be updated"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};

// delete Customer
exports.changeCustomerAsDelete = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const result = await servicemanModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isdelete: "Yes",
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Customer has been deleted successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Customer could not be deleted"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};
