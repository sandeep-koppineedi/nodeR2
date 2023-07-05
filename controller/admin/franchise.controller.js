// import libraries
const bcrypt = require("bcrypt");

// import model
const cityModel = require("../../model/city");
const districtModel = require("../../model/district");
const franchiseModel = require("../../model/franchise");
const stateModel = require("../../model/state");

// add plan
exports.addFranchise = async function (req, res) {
  try {
    const french = await franchiseModel.findOne({
      $or: [
        { companyName: req.body.companyName },
        { supportEmail: req.body.supportEmail },
        { bookingEmail: req.body.bookingEmail },
        { email: req.body.email }
      ]
    });

    if (french) {
      return res
        .status(400)
        .json({ success: false, message: "Franchise already exists!" });
    } else {
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

      const franchiseObj = new franchiseModel({
        companyName: req.body.companyName,
        companyPhone: req.body.companyPhone,
        supportEmail: req.body.supportEmail,
        bookingEmail: req.body.bookingEmail,
        stateId: req.body.stateId,
        stateName: stater ? stater.title : "",
        districtId: req.body.districtId,
        districtName: distr ? distr.title : "",
        cityId: req.body.cityId,
        cityName: cityr ? cityr.title : "",
        address: req.body.address,
        companyGstNumber: req.body.companyGstNumber,
        companyIdImage: req.files.companyIdImage
          ? req.files.companyIdImage[0].path
          : "",
        companyLogo: req.files.companyLogo ? req.files.companyLogo[0].path : "",
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        password: pass,
        status: "active",
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });
      const saveFranchise = await franchiseObj.save();
      if (saveFranchise) {
        return res.status(200).json({
          success: true,
          message: "Franchise has been added successfully"
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Franchise could not be added"
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
exports.getAllFranchisees = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery !== "") {
      condition = {
        $or: [
          { companyName: regex },
          { companyPhone: regex },
          { supportEmail: regex },
          { bookingEmail: regex },
          { stateName: regex },
          { districtName: regex },
          { cityName: regex }
        ]
      };
    }
    console.log(condition);

    const result = await franchiseModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Franchises have been retrieved successfully",
      franchResult: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Bad request"
    });
  }
};

// get all franchisees for dropdown
exports.getAllDropdownFranchisees = async function (req, res) {
  try {
    const result = await franchiseModel
      .find({ status: "active" })
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Franchises have been retrieved successfully",
      franchResult: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Bad request"
    });
  }
};

// get franchise
exports.getFranchise = async function (req, res) {
  try {
    const result = await franchiseModel.find({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "Franchise data has been retrieved successfully",
      franchResult: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Bad request"
    });
  }
};

// edit Franchise
exports.editFranchise = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

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

    const result = await franchiseModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          companyName: req.body.companyName,
          companyPhone: req.body.companyPhone,
          supportEmail: req.body.supportEmail,
          bookingEmail: req.body.bookingEmail,
          stateId: req.body.stateId,
          stateName: stater ? stater.title : "",
          districtId: req.body.districtId,
          districtName: distr ? distr.title : "",
          cityId: req.body.cityId,
          cityName: cityr ? cityr.title : "",
          address: req.body.address,
          companyGstNumber: req.body.companyGstNumber,
          companyIdImage: req.files.companyIdImage
            ? req.files.companyIdImage[0].path
            : console.log("No Img"),
          companyLogo: req.files.companyLogo
            ? req.files.companyLogo[0].path
            : console.log("No Img"),
          userName: req.body.userName,
          email: req.body.email,
          phone: req.body.phone,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Franchise has been updated successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Franchise could not be updated"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};

// edit Franch
exports.changeFranchStatus = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const result = await franchiseModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Franchise status has been updated successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Franchise status could not be updated"
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!"
    });
  }
};
