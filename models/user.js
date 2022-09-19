const { array } = require("joi");
let mongoose = require("mongoose");
// let ObjectIdSchema = mongoose.Schema.ObjectId;
// let ObjectId = mongoose.Types.ObjectId();

let userSchema = new mongoose.Schema(
  {
    // _id:mongoose.Schema.ObjectId,
    // _id: {
    //   type: ObjectIdSchema,
    //   default: function () {
    //     return new ObjectId();
    //   },
    // },
    
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    dateOfBirth: Date,

    imagePath: {
      type: [String],
    },

    publicId: {
      type: [String],
    },
  },
  { timestamps: false }
);

let User = mongoose.model("User", userSchema);
module.exports = User;
