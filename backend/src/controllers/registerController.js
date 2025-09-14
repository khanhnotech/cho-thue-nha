const User = require('../models/User')
const bcrypt = require('bcrypt')


exports.register = async (req, res) => {
    try {
     const {fullname, gmail, phone, username, password} = req.body
    // kiem tra gmail ton tai chua
    const existingGmail = await User.findOne({gmail})
     if(existingGmail) {
        return res.json({success: false, field:"gmail", message: "Gmail đã tồn tại!"})
     } 
     // kiem tra phone ton tai chua
     const existingPhone = await User.findOne({phone})
     if(existingPhone) {
        return res.json({success: false, field:"phone", message: "Số điện thoại đã tồn tại!"})
     } 
         //kiem tra tài khoản ton tai chua
     const existingUsername = await User.findOne({username})
     if(existingUsername) {
        return res.json({success: false, field:"username", message: "Tài khoản đã tồn tại!"})
     }

    // ma hoa mat khau
     const hashedPassword = await bcrypt.hash(password, 10)
     const newUser = new User({
        fullname,
        gmail,
        phone,
        username,
        password: hashedPassword
     })
     await newUser.save();
     return res.status(201).json({success: true, message: "Đăng kí thành công", User: newUser})
    }catch(error) {
     return res.status(500).json({success: false, message:"Lỗi server", error})
    }
}