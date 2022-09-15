const multer = require("multer");
const file = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// const fileFilter = (req, res, cb) => {
//   if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png') {
// cb(null,true);  
//   }
// else {
//   cb({message: 'Invalid file type'}, false); 
// }
// }

// const uploadImage = multer({ storage: storage, fileFilter: fileFilter});

const uploadImage = multer({ storage: storage});

module.exports = {
  uploadImage
}
