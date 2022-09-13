const express = require("express");
const mongoose = require("mongoose");
const { uploadImage } = require("./controllers/multer");
// const bodyParser = require("body-parser");
const AuthRoute = require("./routes/authRoute");
const PORT = 3000;

mongoose.connect ("mongodb://localhost:27017/test");
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Database connection established..!");
});


const app = express();

app.get('/', function(req, res){
  res.render('form');
});

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(
//   express.urlencoded({
//     limit: "50mb",
//     extended: true
//   })
// );
app.use(express.json());
// app.use(uploadImage.array('image',3))
app.use("/api", AuthRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
