// import librraries
const multer = require("multer");

// middleware for uploading the profileImg
const profileImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/profileImg");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const profileImgMaxSize = 30 * 1024 * 1024;
exports.upload_profileImg = multer({
  storage: profileImgStorage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|PNG|jpg|pdf)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: profileImgMaxSize }
});

// middleware for uploading the planImg
const planImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/planImg");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const planImgMaxSize = 30 * 1024 * 1024;
exports.upload_planImg = multer({
  storage: planImgStorage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|PNG|jpg|pdf)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: planImgMaxSize }
});

// middleware for uploading the franchise
const franchiseStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/franchise");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const franchiseMaxSize = 30 * 1024 * 1024;
exports.upload_franchise = multer({
  storage: franchiseStorage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|PNG|jpg|pdf)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: franchiseMaxSize }
});

// middleware for uploading the serviceman
const servicemanStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/serviceman");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const servicemanMaxSize = 30 * 1024 * 1024;
exports.upload_serviceman = multer({
  storage: servicemanStorage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|PNG|jpg|pdf)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: servicemanMaxSize }
});

// middleware for uploading the complaint
const complaintStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/complaint");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const complaintMaxSize = 30 * 1024 * 1024;
exports.upload_complaint = multer({
  storage: complaintStorage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|PNG|jpg|pdf)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: complaintMaxSize }
});

// middleware for uploading the businesSetting
const businesSettingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/businesSetting");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const businesSettingMaxSize = 30 * 1024 * 1024;
exports.upload_businesSetting = multer({
  storage: businesSettingStorage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|PNG|jpg|pdf)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: businesSettingMaxSize }
});

// middleware for uploading the bannerImg
const bannerImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/bannerImg");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const bannerImgMaxSize = 30 * 1024 * 1024;
exports.upload_bannerImg = multer({
  storage: bannerImgStorage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|PNG|jpg|pdf)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: bannerImgMaxSize }
});

// middleware for uploading the commonNotification
const commonNotificationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/commonNotification");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const commonNotificationMaxSize = 30 * 1024 * 1024;
exports.upload_commonNotification = multer({
  storage: commonNotificationStorage,
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(png|PNG|jpg|pdf)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("This file extension is not allowed"));
    }
  },
  limits: { fileSize: commonNotificationMaxSize }
});
