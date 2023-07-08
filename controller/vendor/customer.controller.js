// import libraries
const bcrypt = require("bcrypt");

// import model
const cityModel = require("../../model/city");
const districtModel = require("../../model/district");
const franchiseModel = require("../../model/franchise");
const stateModel = require("../../model/state");
const customerModel = require("../../model/customer");

// add plan
exports.addCustomer = async function (req, res) {
  try {
    const french = await customerModel.findOne({
      $and: [
        { isdelete: "No" },
        {
          $or: [{ phone: req.body.phone }, { email: req.body.email }]
        }
      ]
    });

    if (french) {
      return res
        .status(400)
        .json({ success: false, message: "Customer already exists!" });
    } else {
      const logDate = new Date().toISOString();
      const pass = bcrypt.hashSync(req.body.password, 10);

      const vendor = await franchiseModel.findOne(
        { _id: req.userId },
        { companyName: 1, companyPhone: 1 }
      );

      const CustomerObj = new customerModel({
        customerName: req.body.customerName,
        phone: req.body.phone,
        password: pass,
        email: req.body.email,
        address: req.body.address,
        franchiseId: req.userId,
        franchiseName: vendor ? vendor.companyName : "",
        franchisePhone: vendor ? vendor.companyPhone : "",
        profilePic: req.file ? req.file.path : "uploads/public/userLogo.png",
        isdelete: "No",
        logCreatedDate: logDate,
        logModifiedDate: logDate
      });
      const saveCustomer = await CustomerObj.save();
      if (saveCustomer) {
        return res.status(200).json({
          success: true,
          message: "Customer has been added successfully"
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Customer could not be added"
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
exports.getAllCustomeres = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery !== "") {
      condition = {
        $or: [
          { customerName: regex },
          { phone: regex },
          { email: regex },
          { franchiseName: regex },
          { franchisePhone: regex }
        ]
      };
    }
    condition.franchiseId = req.userId;
    condition.isdelete = "No";
    console.log(condition);

    const result = await customerModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Customers have been retrieved successfully",
      custResult: result
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
    const result = await customerModel.find({ _id: req.body._id });

    res.status(200).json({
      success: true,
      message: "Customer data has been retrieved successfully",
      custResult: result
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

    const result = await customerModel.updateOne(
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

    const result = await customerModel.updateOne(
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
