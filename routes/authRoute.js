const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { uploadImage } = require("../controllers/multer");
const { cloudUpload } = require("../helper/cloudinary");
const { validate } = require("../middlewares/validationMiddleware");
const {
  userRegistrationDataValidation,
  userLoginDataValidation,
  userPasswordValidation,
} = require("../controllers/user/userValidation");
const {
  tokenVerification,
} = require("../middlewares/tokenVerificationMiddleware");


//Register Route with MultipleImages
router.post(
  "/register/uploadMultiple",
  uploadImage.array("image", 3),
  validate(userRegistrationDataValidation),
  authController.register
);

//Login route
router.post("/login", validate(userLoginDataValidation), authController.login);

//changePassword route
router.patch("/changePassword",tokenVerification, validate(userPasswordValidation), authController.changePassword);

//Get route
router.get("/get", tokenVerification, authController.get);

//Update route
router.put("/update",uploadImage.array("image", 3),tokenVerification, authController.update);


module.exports = router;
