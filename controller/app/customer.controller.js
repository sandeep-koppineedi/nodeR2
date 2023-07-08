// getting all the libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// import models
const customerModel = require("../../model/customer");
const vendorModel = require("../../model/franchise");
const otpModel = require("../../model/otp");

// // customer registerations
exports.customerRegisteration = async function (req, res) {
  try {
    const user = await customerModel.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }]
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
    const bcryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const logDate = new Date().toISOString();
    const custObj = new customerModel({
      customerName: req.body.customerName,
      phone: req.body.phone,
      password: bcryptedPassword,
      email: req.body.email,
      address: req.body.address,
      profilePic: "uploads/public/userLogo.png",
      franchiseId: req.body.franchiseId,
      franchiseName: vendor ? vendor.companyName : "",
      franchisePhone: vendor ? vendor.companyPhone : "",
      isdelete: "No",
      logCreatedDate: logDate,
      logModifiedDate: logDate
    });

    const userData = await custObj.save();
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
exports.customerLogin = async function (req, res) {
  // try {
  const user = await customerModel.findOne({
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

// get Customer profile
exports.getCustomerProfile = async function (req, res) {
  // try {
  const profileResult = await customerModel.findOne(
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

// update Customer profile
exports.editCustomerProfile = async function (req, res) {
  try {
    const vendor = await vendorModel.findOne(
      { _id: req.body.franchiseId },
      { companyPhone: 1, companyName: 1 }
    );
    const logDate = new Date().toISOString();
    const profileResult = await customerModel.updateOne(
      { _id: req.userId },
      {
        $set: {
          customerName: req.body.customerName,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
        //   profilePic: req.file ? req.file.path : console.log("No Img"),
        // //   franchiseId: req.body.franchiseId,
        //   franchiseName: vendor ? vendor.companyName : "",
        //   franchisePhone: vendor ? vendor.companyPhone : "",
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

// update customer Company Image
exports.editProfileImage = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const profileResult = await customerModel.updateOne(
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

// change Customer password
// update password
exports.changeCustomerPassword = async function (req, res) {
  try {
    // console.log(req.body);
    let logDate = new Date().toISOString();

    const password = req.body.password;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    if (password == null || password == undefined || password == "") {
      return res.status(404).json({ message: "Please enter current password" });
    }
    const userPass = await customerModel.findOne(
      { _id: req.userId },
      { password: 1 }
    );
    let currentPassVal = bcrypt.compareSync(password, userPass.password);
    if (currentPassVal === true) {
      if (newpassword == confirmpassword) {
        const bcruptedPassword = bcrypt.hashSync(confirmpassword, 10);
        await customerModel.updateOne(
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
          message: "Old and New passwords does not match"
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
