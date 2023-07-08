// getting all the libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// import models
const customerModel = require("../../model/customer");
const vendorModel = require("../../model/franchise");
const otpModel = require("../../model/otp");
const servicemanModel = require("../../model/serviceman");
const cityModel = require("../../model/city");
const districtModel = require("../../model/district");
const stateModel = require("../../model/state");

// // serviceman registerations
exports.servicemanRegisteration = async function (req, res) {
  try {
    const user = await servicemanModel.findOne({
      $and: [
        { isdelete: "No" },
        { $or: [{ email: req.body.email }, { phone: req.body.phone }] }
      ]
    });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "The user already exists!" });
    }
    //   const adminn = await vendorModel.findOne({ _id: req.userId });

    const vendor = await vendorModel.findOne(
      { _id: req.body.franchiseId },
      { companyPhone: 1, companyName: 1 }
    );
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
    const bcryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const logDate = new Date().toISOString();
    const serveObj = new servicemanModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      aadhaarNumber: req.body.aadhaarNumber,
      franchiseId: req.body.franchiseId,
      franchiseName: vendor ? vendor.companyName : "",
      franchisePhone: vendor ? vendor.companyPhone : "",
      stateId: req.body.stateId,
      stateName: stater ? stater.title : "",
      districtId: req.body.districtId,
      districtName: distr ? distr.title : "",
      cityId: req.body.cityId,
      cityName: cityr ? cityr.title : "",
      address: req.body.address,
      email: req.body.email,
      password: bcryptedPassword,
      idImage: "uploads/public/userLogo.png",
      profilePic: "uploads/public/userLogo.png",
      isdelete: "No",
      logCreatedDate: logDate,
      logModifiedDate: logDate
    });

    const userData = await serveObj.save();
    if (userData) {
      return res.status(200).json({
        success: true,
        message: "The user has been successfully added."
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "The user could not be added."
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message ?? "Something went wrong!"
    });
  }
};

// Login/Signin
exports.servicemanLogin = async function (req, res) {
  // try {
  const user = await servicemanModel.findOne({
    $and: [
      { isdelete: "No" },
      {
        $or: [{ email: req.body.phone }, { phone: req.body.phone }]
      }
    ]
  });

  if (user !== null) {
    const password = req.body.password;
    const pass = bcrypt.compareSync(password, user.password);
    if (pass === true && user.isdelete === "No") {
      let token = jwt.sign(
        {
          userId: user._id,
          password: user.password,
          phone: user.phone,
          email: user.email
        },
        process.env.ADMIN_SECRET_KEY,
        { expiresIn: process.env.ADMIN_EXPIRY_DATE }
      );
      const userData = {
        _id: user._id,
        franchiseName: user.companyName,
        email: user.email,
        phone: user.phone
      };

      res.status(200).json({
        success: true,
        message: "You have successfully logged in.",
        token: token,
        user: userData
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "User deleted or invalid password."
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "Please provide a valid phone number."
    });
  }
  // } catch (err) {
  // res.status(400).json({
  //   status: false,
  //   message: err.message ?? "Something went wrong",
  // });
  // }
};

// get Serviceman profile
exports.getServicemanProfile = async function (req, res) {
  // try {
  const profileResult = await servicemanModel.findOne(
    { _id: req.userId },
    { password: 0 }
  );
  console.log(req.userId);

  if (profileResult) {
    res.status(200).json({
      success: true,
      message: "Your data has been successfully retrieved.",
      profileResult
    });
  } else {
    res.status(400).json({ success: false, message: "Bad request" });
  }
  // } catch (err) {
  //   res.status(400).json({ success: false, message: "Somthing went wrong" });
  // }
};

// update Serviceman profile
exports.editServicemanProfile = async function (req, res) {
  try {
    const vendor = await vendorModel.findOne(
      { _id: req.body.franchiseId },
      { companyPhone: 1, companyName: 1 }
    );
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

    const profileResult = await servicemanModel.updateOne(
      { _id: req.userId },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          aadhaarNumber: req.body.aadhaarNumber,
        //   franchiseId: req.body.franchiseId,
        //   franchiseName: vendor ? vendor.companyName : "",
        //   franchisePhone: vendor ? vendor.companyPhone : "",
          stateId: req.body.stateId,
          stateName: stater ? stater.title : "",
          districtId: req.body.districtId,
          districtName: distr ? distr.title : "",
          cityId: req.body.cityId,
          cityName: cityr ? cityr.title : "",
          address: req.body.address,
          email: req.body.email,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    // console.log(req.userId);
    if (profileResult) {
      res.status(200).json({
        success: true,
        message: "Your profile has been successfully updated."
      });
    } else {
      res.status(400).json({ success: false, message: "Bad request" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "Somthing went wrong" });
  }
};

// update serviceman Image
exports.editProfileImage = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const profileResult = await servicemanModel.updateOne(
      { _id: req.userId },
      {
        $set: {
          profilePic: req.file ? req.file.path : console.log("No Img"),
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    // console.log(req.userId);
    if (profileResult) {
      res.status(200).json({
        success: true,
        message: "Profile image has been successfully updated."
      });
    } else {
      res.status(400).json({ success: false, message: "Bad request" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "Somthing went wrong" });
  }
};

// change Serviceman password
// update password
exports.changeServicemanPassword = async function (req, res) {
  try {
    // console.log(req.body);
    let logDate = new Date().toISOString();

    const password = req.body.password;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    if (password == null || password == undefined || password == "") {
      return res.status(404).json({ message: "Please enter current password" });
    }
    const userPass = await servicemanModel.findOne(
      { _id: req.userId },
      { password: 1 }
    );
    let currentPassVal = bcrypt.compareSync(password, userPass.password);
    if (currentPassVal === true) {
      if (newpassword == confirmpassword) {
        const bcruptedPassword = bcrypt.hashSync(confirmpassword, 10);
        await servicemanModel.updateOne(
          { _id: req.userId },
          {
            $set: {
              password: bcruptedPassword,
              logDateModified: logDate
            }
          },
          { new: true }
        );
        res
          .status(200)
          .json({ success: true, message: "Password updated successfully" });
      } else {
        res.status(400).json({
          success: false,
          message: "New and Confirm passwords does not match"
        });
      }
    } else {
      res.status(400).json({ success: false, message: "Invalid old password" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Something went wrong!", error: err });
  }
};
