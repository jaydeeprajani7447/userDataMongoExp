const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const {
  deleteUploadedLocalFiles,
  deleteUploadedCloudFiles,
} = require("../helper/deleteUploadedFiles");
const config = require("../config/config");
const cloudinary = require("cloudinary").v2;
const fileDetails = require("../cloudinary");

const register = async (req, res) => {
  try {
    const userExisted = await User.findOne({ email: req.body.email });
    if (userExisted) {
      for (i = 0; i < req.files.length; i++) {
        await deleteUploadedLocalFiles(req.files[i].path);
      }

      return res.status(200).json({ message: "User already exists" });
    }
    const files = await fileDetails.cloudUpload(req);
    for (i = 0; i < req.files.length; i++) {
      await deleteUploadedLocalFiles(req.files[i].path);
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    let user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPass,
      dateOfBirth: new Date(req.body.dateOfBirth),
      imagePath: files[0],
      publicId: files[1],
    });

    await user.save();
    return res.json({
      message: "User saved successfully!",
      user,
    });
  } catch (err) {
    console.log("err :>> ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    // res.json(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(403).json({ message: "Wrong password entered" });
    }
    const id = user.id;
    const objectid = id.split("-")[0];
    // console.log(objectid);

    // let token = jwt.sign({ email: user.email }, config.secretKey, {
    //   expiresIn: "1h",
    // });

    let token = jwt.sign({ _id: objectid }, config.secretKey, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Login successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const get = async (req, res) => {
  try {
    // const user = await User.find({ email:req.user.email});
    const user = await User.find({ _id: req.user._id });
    // console.log('userId :', user._id);
    return res
      .status(200)
      .json({ message: "Retrieved data successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    // const existedUserDetails = await User.find({
    //   email: req.user.email,
    // });
    const existedUserDetails = await User.find({
      _id: req.user._id,
    });

    const files = await fileDetails.cloudUpload(req);

    for (i = 0; i < req.files.length; i++) {
      await deleteUploadedCloudFiles(existedUserDetails[0].publicId[i]);
      await deleteUploadedLocalFiles(req.files[i].path);
    }

    const user = await User.findOneAndUpdate(
      // { email: req.user.email },
      { _id: req.user._id },
      {
        $set: {
          fullName: req.body.fullName,
          email: req.body.email,
          dateOfBirth: new Date(req.body.dateOfBirth),
          imagePath: files[0],
          publicId: files[1],
        },
      },
      { new: true }
    );
    return (
      console.log("User Data updated successfully", user),
      res.status(200).json({
        message: "User Data updated successfully, Updated User =>",
        user,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  try {
    // const user = await User.findOne({ email: req.user.email }).select("+password");
    const user = await User.findOne({ _id: req.user._id }).select("+password");
    console.log("user :", user);

    const matchOldPassword = await bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );
    if (!matchOldPassword) {
      res.status(404).json({ message: "OldPassword mismatched" });
    }
    const hashedPass = await bcrypt.hash(req.body.newPassword, 10);
    const userUpdate = await User.findOneAndUpdate(
      // { email: req.user.email },
      { _id: req.user._id},
      {
        $set: {
          password: hashedPass,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  get,
  update,
  changePassword,
};
