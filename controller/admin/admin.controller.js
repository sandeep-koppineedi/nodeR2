// getting all the libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// import models
const Admin = require("../../model/admin");
const otpModel = require("../../model/otp");

// admin/Emp registerations
exports.adminRegisteration = async function (req, res) {
  try {
    const user = await Admin.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }]
    });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "The user already exists!" });
    }
    //   const adminn = await Admin.findOne({ _id: req.userId });
    const bcryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const logDate = new Date().toISOString();
    const adminEmpObj = new Admin({
      name: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      role: "superadmin",
      password: bcryptedPassword,
      status: "active",
      rolesAndPermissions: [
        {
          DashView: true,

          plansAdd: true,
          plansView: true,
          plansEdit: true,
          plansDelete: true,

          franchiseAdd: true,
          franchiseView: true,
          franchiseEdit: true,
          franchiseDelete: true,

          customerAdd: true,
          customerView: true,
          customerEdit: true,
          customerDelete: true,

          servicemenAdd: true,
          servicemenView: true,
          servicemenEdit: true,
          servicemenDelete: true,

          bookingListAdd: true,
          bookingListView: true,
          bookingListEdit: true,
          bookingListDelete: true,

          couponAdd: true,
          couponView: true,
          couponEdit: true,
          couponDelete: true,

          reportsAdd: true,
          reportsView: true,
          reportsEdit: true,
          reportsDelete: true,

          settingsAdd: true,
          settingsView: true,
          settingsEdit: true,
          settingsDelete: true
        }
      ],
      logCreatedDate: logDate,
      logModifiedDate: logDate
    });
    const userData = await adminEmpObj.save();
    res.status(200).json({
      success: true,
      message: "The user was successfully added."
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Bad request. User data could not be saved.",
      error: error.message ?? "Something went wrong!"
    });
  }
};

// Login/Signin
exports.adminLogin = async function (req, res) {
  // try {
  const user = await Admin.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.email }]
  });

  if (user !== null) {
    const password = req.body.password;
    const pass = bcrypt.compareSync(password, user.password);
    if (pass === true && user.status === "active") {
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
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role
      };
      let rolesAndPermissions =
        user.rolesAndPermissions.length !== 0
          ? user.rolesAndPermissions[0]
          : {};

      res.status(200).json({
        success: true,
        message: "You have successfully logged in.",
        token: token,
        user: userData,
        rolesAndPermissions: rolesAndPermissions
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "User Inactive or Invalid password."
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "Please provide a valid email address or phone number."
    });
  }
  // } catch (err) {
  // res.status(400).json({
  //   status: false,
  //   message: err.message ?? "Something went wrong",
  // });
  // }
};

// get admin profile
exports.getAdminProfile = async function (req, res) {
  // try {
  const profileResult = await Admin.findOne(
    { _id: req.userId },
    {
      name: 1,
      email: 1,
      phone: 1,
      role: 1,
      address: 1,
      status: 1,
      profilePic: 1,
      rolesAndPermissions: 1
    }
  );
  console.log(req.userId);
  if (profileResult) {
    res.status(200).json({
      success: true,
      message: "Your data was successfully retrieved.",
      profileResult
    });
  } else {
    res.status(400).json({ success: false, message: "Bad request" });
  }
  // } catch (err) {
  //   res.status(400).json({ success: false, message: "Somthing went wrong" });
  // }
};

// update admin profile
exports.editAdminProfile = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const profileResult = await Admin.updateOne(
      { _id: req.userId },
      {
        $set: {
          name: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    // console.log(req.userId);
    if (profileResult) {
      res.status(200).json({
        success: true,
        message: "Your profile was successfully updated."
      });
    } else {
      res.status(400).json({ success: false, message: "Bad request" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "Somthing went wrong" });
  }
};

// update admin profile image
exports.editAdminProfileImage = async function (req, res) {
  try {
    const logDate = new Date().toISOString();
    const profileResult = await Admin.updateOne(
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
        message: "Your profile was successfully updated."
      });
    } else {
      res.status(400).json({ success: false, message: "Bad request" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "Somthing went wrong" });
  }
};

// change admin password
// update password
exports.changeAdminPassword = async function (req, res) {
  try {
    // console.log(req.body);
    let logDate = new Date().toISOString();

    const password = req.body.password;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    if (password == null || password == undefined || password == "") {
      return res.status(404).json({ message: "Please enter current password" });
    }
    const userPass = await Admin.findOne({ _id: req.userId }, { password: 1 });
    let currentPassVal = bcrypt.compareSync(password, userPass.password);
    if (currentPassVal === true) {
      if (newpassword == confirmpassword) {
        const bcruptedPassword = bcrypt.hashSync(confirmpassword, 10);
        await Admin.updateOne(
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
        res
          .status(400)
          .json({ success: false, message: "New passwords does not match" });
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

/************************ FORGOT PASSWORD *********************/

// send OTP EMAIL
exports.generateOtp = async function (req, res) {
  // try {
  const user = await Admin.findOne({ email: req.body.email });

  if (user) {
    let num = "1234567890";
    let otp = "";
    let oneTimePassword;
    let senderEmail = req.body.email;

    for (let i = 0; i < 6; i++) {
      otp = otp + num[Math.floor(Math.random() * 10)];
    }

    oneTimePassword = otp;

    const otpObj = new otpModel({
      Otp: oneTimePassword,
      emailId: senderEmail,
      userId: user._id
    });

    const otpSave = otpObj.save();

    //   if (eror) {
    //     return res.status(400).json({ message: "OTP could not be generated" });
    //   }
    if (otpSave) {
      const userdata = await Admin.findOne(
        { email: senderEmail },
        { _id: 1, email: 1 }
      );
      let userInfo = userdata._id;
      // const transporter = nodemailer.createTransport({ // forgot password passed attempt for gmail
      //   service: "gmail",
      //   host: "smtp.gmail.com",
      //   port: "587",
      //   auth: {
      //     user: "syed.umaismgm@gmail.com",
      //     pass: "broakwltzgqydmdr"
      //   },
      //   secureConnection: "false",
      //   tls: {
      //     ciphers: "SSLv3",
      //     rejectUnauthorized: false
      //   }
      // });

      const transporter = nodemailer.createTransport({
        service: "email",
        host: "mail.digitalraiz.co.in",
        port: "587",
        auth: {
          user: "no-reply@digitalraiz.co.in",
          pass: "6RwZAp&0s"
        },
        secureConnection: "false",
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false
        }
      });

      console.log(senderEmail);
      let mailOpetions = {
        from: "no-reply@digitalraiz.co.in",
        to: `${senderEmail}`,
        attachments: [
          {
            filename: "spplogo.png",
            path: "http://103.186.185.77:5031/uploads/public/spplogo.png",
            cid: "spplogo"
          }
        ],
        subject: "Forgot password OTP",
        html: `
          <!DOCTYPE html>

          <html
            lang="en"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:v="urn:schemas-microsoft-com:vml"
          >
            <head>
              <title></title>
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
              <meta content="width=device-width, initial-scale=1.0" name="viewport" />
              
              <style>
                * {
                  box-sizing: border-box;
                }
          
                body {
                  margin-top: 22px;
                  padding: 0;
                }
          
                a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: inherit !important;
                }
          
                #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                }
          
                p {
                  line-height: inherit;
                }
          
                .desktop_hide,
                .desktop_hide table {
                  mso-hide: all;
                  display: none;
                  max-height: 0px;
                  overflow: hidden;
                }
          
                .image_block img + div {
                  display: none;
                }
          
                @media (max-width: 690px) {
                  .desktop_hide table.icons-inner,
                  .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                  }
          
                  .icons-inner {
                    text-align: center;
                  }
          
                  .icons-inner td {
                    margin: 0 auto;
                  }
          
                  .image_block img.big,
                  .row-content {
                    width: 100% !important;
                  }
          
                  .mobile_hide {
                    display: none;
                  }
          
                  .stack .column {
                    width: 100%;
                    display: block;
                  }
          
                  .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                  }
          
                  .desktop_hide,
                  .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                  }
                }
              </style>
            </head>
            <body
              style="
                background-color: #37474f;
                margin-top: 30px;
                padding: 0;
                -webkit-text-size-adjust: none;
                text-size-adjust: none;
              "
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="nl-container"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #37474f;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-1"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  background-color: #b1e5db;
                                  color: #000000;
                                  width: 670px;
                                "
                                width="670"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="image_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              width: 100%;
                                              padding-right: 0px;
                                              padding-left: 0px;
                                            "
                                          >
                                            <div
                                              align="center"
                                              class="alignment"
                                              style="line-height: 10px"
                                            >
                                             <img
                                                  alt="company logo"
                                                  src="http://103.186.185.77:5031/uploads/public/images/logo_-16_4.png"
                                                  style="
                                                    display: block;
                                                    height: auto;
                                                    border: 0;
                                                    width: 120px;
                                                    max-width: 100%;
                                                  "
                                                  title="company logo"
                                                  width="120"
                                              />
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-2"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  background-color: #b1e5db;
                                  color: #000000;
                                  width: 670px;
                                "
                                width="670"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="image_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              width: 100%;
                                              padding-right: 0px;
                                              padding-left: 0px;
                                            "
                                          >
                                            <div
                                              align="center"
                                              class="alignment"
                                              style="line-height: 10px"
                                            >
                                              <img
                                                  alt="reset password"
                                                  class="big"
                                                  src="http://103.186.185.77:5031/uploads/public/images/3275432.png"
                                                  style="
                                                    display: block;
                                                    height: auto;
                                                    border: 0;
                                                    width: 670px;
                                                    max-width: 100%;
                                                  "
                                                  title="reset password"
                                                  width="670"
                                              />
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                      <div
                                        class="spacer_block block-2"
                                        style="
                                          height: 40px;
                                          line-height: 40px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-3"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: Arial, sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: 'Helvetica Neue', Helvetica,
                                                    Arial, sans-serif;
                                                  mso-line-height-alt: 16.8px;
                                                  color: #393d47;
                                                  line-height: 1.2;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    text-align: center;
                                                    font-size: 16px;
                                                    mso-line-height-alt: 19.2px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >We received a request to reset your
                                                    password.</span
                                                  >
                                                </p>
                                                
                                                <p
                                                  style="
                                                    margin: 0;
                                                    text-align: center;
                                                    font-size: 16px;
                                                    mso-line-height-alt: 19.2px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >Your One Time Password (OTP):
                                                    </span>
                                                    <strong>
                                                    <span style="font-size: 16px; "
                                                    >${oneTimePassword}
                                                    </span>
                                                  </strong>
                                                </p>
                                                <br>
          
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-family: 'Gothic';
                                                    text-align:center;
                                                    font-size: 6px;
                                                    mso-line-height-alt: 12px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >Note: If you didn't make this request,
                                                    simply ignore this email.</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="20"
                                        cellspacing="0"
                                        class="button_block block-4"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-3"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                <!-- style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  background-color: #1f1f20;
                                  color: #000000;
                                  width: 670px;
                                "
                                width="670" -->
                              >
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-4"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 670px;
                                "
                                width="670"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="icons_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              vertical-align: middle;
                                              color: #9d9d9d;
                                              font-family: inherit;
                                              font-size: 15px;
                                              padding-bottom: 5px;
                                              padding-top: 5px;
                                              text-align: center;
                                            "
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                              "
                                              width="100%"
                                            >
                                              <tr>
                                                <td
                                                  class="alignment"
                                                  style="
                                                    vertical-align: middle;
                                                    text-align: center;
                                                  "
                                                >
                                                  
                                                  <!--[if !vml]><!-->
                                                  <table
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    class="icons-inner"
                                                    role="presentation"
                                                    style="
                                                      mso-table-lspace: 0pt;
                                                      mso-table-rspace: 0pt;
                                                      display: inline-block;
                                                      margin-right: -4px;
                                                      padding-left: 0px;
                                                      padding-right: 0px;
                                                    "
                                                  >
                                                    <!--<![endif]-->
                                                    <tr>
                                                       <td
                                                        style="
                                                          font-family: Helvetica Neue,
                                                            Helvetica, Arial, sans-serif;
                                                          font-size: 15px;
                                                          color: #9d9d9d;
                                                          vertical-align: middle;
                                                          letter-spacing: undefined;
                                                          text-align: center;
                                                        "
                                                      >
                                                        <a
                                                          href="https://www.designedwithbee.com/"
                                                          style="
                                                            color: #9d9d9d;
                                                            text-decoration: none;
                                                          "
                                                          target="_blank"
                                                          >Designed By Digital Raiz</a
                                                        >
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- End -->
            </body>
          </html>
             `
      };

      transporter.sendMail(mailOpetions, function (err, success) {
        if (err) {
          console.log(err);
        }
        if (success) {
          console.log("Email sent successfully");
        }
      });

      const updateOTP = await otpModel.updateOne(
        { _id: otpObj._id },
        {
          $set: {
            userId: userdata._id
          }
        },
        { new: true }
      );
      res.status(200).json({
        message: "OTP has been sent successfully to specified email..!",
        userInfo: userInfo
      });
    }
  } else {
    return res
      .status(400)
      .json({ message: "User is not registered with this email" });
  }

  // } catch (err) {
  //   res.status(400).json({ message: "Something went wrong..!" });
  // }
};

// comapre OTP
exports.compareOtp = async function (req, res) {
  try {
    const otpResult = await otpModel
      .findOne({ userId: req.body._id })
      .sort({ createdAt: -1 });

    console.log(otpResult);

    if (req.body.emailOtp === otpResult.Otp) {
      res.status(200).json({ message: "OTP has been verified successfully." });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid OTP", Error: err });
  }
};

// reset password
exports.resetPassword = async function (req, res) {
  // try {
  const showEmail = await otpModel.findOne({ userId: req.body.userId });
  console.log(showEmail);
  if (showEmail) {
    const { newpassword, confirmpassword } = req.body;

    if (newpassword === confirmpassword) {
      let bcruptedPassword = bcrypt.hashSync(confirmpassword, 10);

      const showUser = await Admin.updateOne(
        { _id: showEmail.userId },
        {
          $set: {
            password: bcruptedPassword
          }
        },
        { new: true }
      );

      const transporter = nodemailer.createTransport({
        service: "email",
        host: "mail.digitalraiz.co.in",
        port: "587",
        auth: {
          user: "no-reply@digitalraiz.co.in",
          pass: "6RwZAp&0s"
        },
        secureConnection: "false",
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false
        }
      });

      // console.log(senderEmail);
      let mailOpetions = {
        from: "no-reply@digitalraiz.co.in",
        to: `${showEmail.emailId}`,
        subject: "Reset password",
        html: `<p style="color : Black; font-size: 15px">Hi There, <br> You have successfully reset your password.</p>`
      };

      transporter.sendMail(mailOpetions, function (err, success) {
        if (err) {
          console.log(err);
        }
        if (success) {
          console.log("Email sent successfully");
        }
      });

      res.status(200).json({
        message:
          "The password has been reset successfully. Please login with your new password."
      });
    } else {
      return res.status(400).json({ message: "Invalid Password" });
    }
  } else {
    return res.status(400).json({ message: "Invalid User data" });
  }
  // } catch (err) {
  //   res.status(400).json({ message: "something went wrong!", error: err });
  // }
};

/****************** DUMMY APIs *******************/
// update admin roles and permissions
exports.updateAdminRolesAndPermit = async function (req, res) {
  try {
    const logDate = new Date().toISOString();

    const employeeRole = await Admin.updateOne(
      { _id: req.body.id },
      {
        $set: {
          rolesAndPermissions: req.body.rolesPermissions,
          logModifiedDate: logDate
        }
      },
      { new: true }
    );

    if (employeeRole) {
      res.status(200).json({
        success: true,
        message: "Admin roles and permissions have been modified successfully"
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Somthing went wrong" });
  }
};
