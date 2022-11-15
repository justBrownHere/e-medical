const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name!"],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, "Please enter your last name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
      trim: true,
    },
    address: {
      type: String,
      // required: [true, "Please enter your address!"],
    },
    gender: {
      type: String,
      default: "M",
    },
    role: {
      type: String,
      default: "R3",
    },
    position: {
      type: String,
      default: "P0",
    },
    details: {
      type: Schema.Types.ObjectId,
      ref: "Markdown",
    },
    infor: {
      type: Schema.Types.ObjectId,
      ref: "DoctorInfor",
    },
    avatar: {
      type: String,
      default:
        "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
