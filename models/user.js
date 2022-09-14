const { array } = require("joi");
let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    fullName : {
        type: String,
        required: true,
            },
    email :{
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        select : false,
    },
    dateOfBirth : Date,

    imagePath :{
        type: [String],
    },

    publicId : {
        type: [String],
    }
    },{timestamps: false});

let User = mongoose.model("User", userSchema);
module.exports = User;
