const multer = require("multer");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Apartment = require("../models/Apartment");
const Category = require("../models/Category");

// cau hinh Cloudinary
// cloudinary.config({
//   cloud_name: "dy0folp4i",
//   api_key: "935881453323419",
//   api_secret: "PGZ_nRaTRMu0CUOi14jDnW9IaIo",
// });
// // cau hinh storage cho multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "img_apartments",
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });
// const upload = multer({ storage });
// exports.upload = upload;

// lưu tương đối
const storage = multer.diskStorage({
  destination: function(req, res, cb) {
      const uploadPath = path.resolve(__dirname, "../../Store/img_Apartment");
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({storage})
exports.upload = upload

exports.create = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  try {
    console.log(req.body);
    console.log(req.files);
    const {
      user_id,
      category_id,
      title,
      price,
      area,
      furniture,
      num_people,
      deposit,
      description,
      street_name,
      province,
      district,
    } = req.body;
    // luu url images vo db
    // let imageUrls = [];
    // if (Array.isArray(req.files)) {
    //   imageUrls = req.files.map((file) => file.path);
    // } else if (req.file) {
    //   imageUrls = [req.file.path];
    // }

    // luu tempImages vao db
    let tempImages = []
    if (Array.isArray(req.files)) {
      tempImages = req.files.map((file) => `img_Apartment/${file.filename}`)
    }else if(req.file) {
      tempImages = [`img_Apartment/${req.file.filename}`]
    }
    const myApartment = new Apartment({
      user_id,
      category_id,
      title,
      price,
      area,
      furniture,
      num_people,
      deposit,
      description,
      tempImages,
      street_name,
      province,
      district,
    });
    await myApartment.save();
    res.json({ success: true, data: myApartment });
  } catch (err) {
    console.error("❌ Lỗi khi tạo apartment:", err);
    if (err.http_code) {
      console.error("Cloudinary error code:", err.http_code);
    }
    res.status(500).json({
      success: false,
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }
};
// my-apartment/categories
exports.categories = async(req, res) => {
    try{
      const categories = await Category.find()
      if(!categories || categories.length === 0) return res.status(404).json({success: false, message: "Không tìm thấy Category"})
      res.json(categories)
    }catch(err){
      res.status(500).json({success: false, message: err.message})
    }
}
exports.show = async(req, res) => {
  const apartment = await Apartment.find()
  res.json(apartment)
}
exports.destroy = async(req, res) => {
  try{
    // const apartment = await Apartment.findById(req.params.id)
    // if(!apartment) return res.status(404).json({success: false, message: "Khong tim thay Apartment"})
    
    //   // thuc hien xoa tren cloudinary
    //   if(apartment.images && apartment.images.length > 0) {
    //     for (const url of apartment.images) {
    //       const parts = url.split("/")
    //       const fileName = parts[parts.length -1].split(".")[0]
    //       const folder = "img_apartments"
    //       const public_id = `${folder}/${fileName}`
    //       await cloudinary.uploader.destroy(public_id)
    //     }
    //   }
  await Apartment.deleteOne({_id: req.params.id})
  res.json({success: true, message: "Xóa thành công!"}) 
    }catch (err) {
    console.error("❌ Lỗi khi xóa apartment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}
exports.edit = async(req, res) => {
    try{
      const apartment = await Apartment.findById(req.params.id)
      if(!apartment) return res.status(404).json({success: false, message: "Không tìm thấy Apartment"})
      
        //map tempImages thành Url
        const tempImagesUrl = apartment.tempImages.map(img => `/Store/${img}`)
        res.json({success: true, data: {...apartment._doc, tempImages: tempImagesUrl}})
    }catch(err){
      res.status(500).json({success: false, message: err.message})
    }
}