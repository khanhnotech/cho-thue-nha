const User = require('../models/User')
const bcrypt = require('bcrypt')


//[POST] /login
const login = async (req, res) => {
    try {
        const {username, password} = req.body
        // kiem tra user co ton tai khong
        const user = await User.findOne({username})
        if(!user) {
            return res.json({
                success: false,
                field: "username",
                message: "Tài khoản không tồn tại!"
            })
        }
        // so sanh mat khau
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.json({
                success: false,
                field: "password",
                message: "Mật khẩu không chính xát!",
            })
        }
        return res.json({
            success: true,
            message: "Đăng nhập thành công!",
            user: {
                id: user._id,
                fullname: user.fullname,
                gmail: user.gmail,
                phone: user.phone,
                username: user.username,
                role: user.role,
                isVerifyfied: user.isVerifyfied,
            }
        })
    }catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error server",
        })
    }
}
module.exports = {login}