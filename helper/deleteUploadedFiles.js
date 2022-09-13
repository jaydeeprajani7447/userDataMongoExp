const cloudinary = require("cloudinary").v2;
const { path } = require("../server");
const fs = require("fs");

 //delete files locally
const deleteUploadedLocalFiles = (path) => {
 fs.unlink(path, function (err) {
    if (err) throw err;
  })
}

 //delete cloudinary files

 const deleteUploadedCloudFiles = (path) => {
  cloudinary.uploader.destroy(
    path,
    (error, result) => {
      if (result) {
      } else return error;
    });
 }

 module.exports = {
  deleteUploadedLocalFiles,
  deleteUploadedCloudFiles
 }