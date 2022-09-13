const cloudinary = require("cloudinary").v2;

// const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudUpload = async (req) => {
  const fileDetails = [];
  const urlList = [];
  const publicIds = [];
  try {
    for (let i = 0; i < req.files.length; i++) {
      await cloudinary.uploader.upload(
        req.files[i].path,
        { folder: "images" },
        (err, result) => {
          urlList.push(result.url);
          publicIds.push(result.public_id);
        }
      );
    }
    fileDetails.push(urlList);
    fileDetails.push(publicIds);

    return fileDetails;
  } catch (err) {
    console.log("err :>> ", err);
    return;
  }
};

module.exports = {
  cloudUpload,
};
