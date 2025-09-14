const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Verification = require("../models/Verification");
const User = require("../models/User");

// [POST] /send-otp
const sendOtp = async (req, res) => {
  try {
    const { gmail, userId } = req.body;
    if (!gmail)
      return res.json({ success: false, message: "Vui lòng nhập Gmail!" });
    
    // check Gmail có bị trùng user khác không
    const existedUser = await User.findOne({ gmail });
    if (existedUser) {
      return res.json({
          success: false,
          message: "Gmail đã tồn tại, vui lòng nhập Gmail khác",
        });
    }
    // Tạo OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    // Lưu OTP vào DB
    await Verification.findOneAndUpdate(
      { gmail },
      { otp, otpExpires, userId },
      { upsert: true, new: true }
    );

    // Gửi gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lamkhanh270070@gmail.com",
        pass: "ssuc lucy wekn ipgk",
      },
    });  bn

    await transporter.sendMail({
      from: `Cho Thuê Nhà <lamkhanh270070@gmail.com>`,
      to: gmail,
      subject: "Mã xác thực OTP",
      text: `Mã OTP của bạn là: ${otp}. Hết hạn sau 5 phút.`,
    });

    res.json({ success: true, message: "OTP đã gửi tới Gmail" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// [POST] /verify-otp
const verifyOtp = async (req, res) => {
  try {
    const { gmail, otp } = req.body;

    // Tìm OTP theo gmail
    const verification = await Verification.findOne({ gmail });
    if (!verification) {
      return res.json({
        success: false,
        message: "Chưa gửi OTP hoặc OTP đã hết hạn",
      });
    }

    // Kiểm tra OTP + hạn
    if (verification.otp !== otp || verification.otpExpires < Date.now()) {
      return res.json({
        success: false,
        message: "OTP không hợp lệ hoặc đã hết hạn",
      });
    }

    // nếu có userId --> update lại gmail mới cho user
    let updateUser = null;
    if (verification.userId) {
      updateUser = await User.findByIdAndUpdate(
        verification.userId,
        { gmail, isVerifyfied: true },
        { new: true }
      );
    }
    // Xoá OTP sau khi dùng
    await Verification.deleteOne({ gmail });

    res.json({
      success: true,
      message: "Xác thực Gmail thành công",
      user: updateUser
        ? {
            _id: updateUser._id,
            fullname: updateUser.fullname,
            gmail: updateUser.gmail,
            phone: updateUser.phone,
            username: updateUser.username,
            role: updateUser.role,
            isVerifyfied: updateUser.isVerifyfied,
          }
        : { gmail },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

module.exports = { sendOtp, verifyOtp };
