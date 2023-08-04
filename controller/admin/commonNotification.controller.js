const vendorModel = require("../../model/franchise");
const customerModel = require("../../model/customer");
const notificationModel = require("../../model/commonNotification");

// create new notification
exports.createNotification = async function (req, res) {
  // try {
  console.log(req.body);
  const logData = new Date().toISOString();

  switch (req.body.department) {
    case "Vendor":
      let vendorUsers = [];
      let vendorsData = await vendorModel.find(
        { status: "active" },
        { _id: 1 }
      );

      if (req.body.userList == "All") {
        vendorsData.map((item) => {
          // console.log(item);

          vendorUsers.push(item._id.toString());
        });

        /********** FCM NOT APPLICABLE FOR VENDOR/FRANCHISE PANEL **********/
        // if(vendorUsers.length > 0){
        //   // FCM code
        // }else{
        //   console.log("No FCM")
        // }
      } else {
        const showVendor = await vendorModel.find(
          {
            $and: [{ _id: { $in: req.body.userList } }, { status: "active" }],
          },
          { _id: 1 }
        );

        showVendor.map((item) => {
          vendorUsers.push(item._id.toString());
        });

        /********** FCM NOT APPLICABLE FOR VENDOR/FRANCHISE PANEL **********/
        // if(vendorUsers.length > 0){
        //   // FCM code
        // }else{
        //   console.log("No FCM")
        // }
      }

      console.log(vendorUsers);

      new notificationModel({
        department: req.body.department,
        users: vendorUsers,
        title: req.body.subject,
        description: req.body.description,
        notifImg: req.file ? req.file.path : "uploads/public/notif_icon.png",
        logCreatedDate: logData,
        logModifiedDate: logData,
      }).save();
      break;

    case "Customer":
      let customerUsers = [];
      let customerData = await customerModel.find(
        { isdelete: "No" },
        { _id: 1, notificationBell: 1 }
      );

      if (req.body.userList == "All") {
        customerData.map((item) => {
          // console.log(item);
          if (item.notificationBell == true) {
            customerUsers.push(item._id.toString());
          } else {
            console.log("No user");
          }
        });
        // if(customerUsers.length > 0){
        //   // FCM code
        // }else{
        //   console.log("No FCM")
        // }
      } else {
        const showAgent = await customerModel.find(
          {
            $and: [{ _id: { $in: req.body.userList } }, { isdelete: "No" }],
          },
          { _id: 1, notificationBell: 1 }
        );

        showAgent.map((item) => {
          if (item.notificationBell == true) {
            customerUsers.push(item._id.toString());
          } else {
            console.log("No user");
          }
        });

        // if(customerUsers.length > 0){
        //   // FCM code
        // }else{
        //   console.log("No FCM")
        // }
      }

      console.log(customerUsers);

      new notificationModel({
        department: req.body.department,
        users: customerUsers,
        title: req.body.subject,
        description: req.body.description,
        notifImg: req.file ? req.file.path : "uploads/public/notif_icon.png",
        logCreatedDate: logData,
        logModifiedDate: logData,
      }).save();
      break;

    case "All":
      let vndrUser = [];
      let vndrdata = await vendorModel.find({ status: "active" }, { _id: 1 });

      let cstUsers = [];
      let shoCusts = await customerModel.find(
        { isdelete: "No" },
        { _id: 1, notificationBell: 1 }
      );

      let allUserIds = [];

      if (req.body.userList == "All") {
        // staff all data
        vndrdata.map((item) => {
          // console.log(item);
          vndrUser.push(item._id.toString());
        });
        // if(vndrUser.length > 0){
        //   // FCM code
        // }else{
        //   console.log("No FCM")
        // }

        // customer all data
        shoCusts.map((item) => {
          console.log(item);
          if (item.notificationBell == true) {
            cstUsers.push(item._id.toString());
          } else {
            console.log("No user");
          }
        });
        // if(agentUserr.length > 0){
        //   // FCM code
        // }else{
        //   console.log("No FCM")
        // }

        // Concat all users
        allUserIds = [...vndrUser, ...cstUsers];
      } else {
        // staff selected data
        const showEmploi = await vendorModel.find(
          {
            $and: [{ _id: { $in: req.body.userList } }, { status: "active" }],
          },
          { _id: 1 }
        );

        showEmploi.map((item) => {
          vndrUser.push(item._id.toString());
        });

        // if(vndrUser.length > 0){
        //   // FCM code
        // }else{
        //   console.log("No FCM")
        // }

        // customer selected data
        const shoCusts = await customerModel.find(
          {
            $and: [{ _id: { $in: req.body.userList } }, { isdelete: "No" }],
          },
          { _id: 1, notificationBell: 1 }
        );

        shoCusts.map((item) => {
          if (item.notificationBell == true) {
            cstUsers.push(item._id.toString());
          } else {
            console.log("No user");
          }
        });

        // if(cstUsers.length > 0){
        //   // FCM code
        // }else{
        //   console.log("No FCM")
        // }
        console.log(cstUsers);

        // Concat all users
        allUserIds = [...vndrUser, ...cstUsers];
      }

      console.log(allUserIds);

      new notificationModel({
        department: req.body.department,
        users: allUserIds,
        title: req.body.subject,
        description: req.body.description,
        notifImg: req.file ? req.file.path : "uploads/public/notif_icon.png",
        logCreatedDate: logData,
        logModifiedDate: logData,
      }).save();
      break;
  }
  res.status(200).json({
    succes: true,
    message: "Notification has been added successfully",
  });
  // } catch {
  //   res.status(400).json({ status: false, message: "Something went wrong..!" });
  // }
};

// get all notifications
exports.getAllNotifications = async function (req, res) {
  try {
    let condition = {};
    let regex = new RegExp(req.query.searchQuery, "i");
    if (req.query.searchQuery !== "") {
      condition = { $or: [{ title: regex }, { description: regex }] };
    }
    console.log(condition);

    const notifResult = await notificationModel
      .find(condition)
      .sort({ logCreatedDate: -1 });

    res.status(200).json({
      success: true,
      message: "Notifications have been retrieved successfully",
      notifResult: notifResult,
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: err.message ?? "Bad request" });
  }
};

// delete notification
exports.deleteNotification = async function (req, res) {
  try {
    const removeNotifcation = await notificationModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (removeNotifcation) {
      res.status(200).json({
        success: true,
        message: "Notification has been removed successfully",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message ?? "Something went wrong!",
    });
  }
};
