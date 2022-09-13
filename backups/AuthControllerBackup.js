const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer')
const { required } = require("@hapi/joi/lib/base.js");

const register = async (req, res, next) => {
  try {
    const email = req.body.email;
    const userExisted = await User.findOne({email});
    if(userExisted){
     return res.status(200).json({  message: "User already exists" });
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);    
    let user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPass,
      dateOfBirth: new Date(req.body.dateOfBirth),
      image : req.body.image,
    });



      user.save();
      return res.json({
        message: "User saved successfully!",
      });
  
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    console.log('email :>> ', email);
      const user = await User.findOne({email});
      // res.json(user)
      if (!user){
        return res.status(404).json({ message: "User not found" });
      }
      const hashedPass = await bcrypt.hash(req.body.password, 10)   

    const passwordMatch = await bcrypt.compareSync(req.body.password,user.password)
      if(!passwordMatch){
      return  res.status(403).json({ message:" Wrong password entered"});
      }
            let token = jwt.sign({ email: user.email }, "verySecretValue", {
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

module.exports = {
  register,
  login,
};
