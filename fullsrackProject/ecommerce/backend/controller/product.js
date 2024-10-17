const productModel = require("../models/product");
const multiparty = require("multiparty");
const multer = require("multer");
const Product = () => {
  const createProduct = async (req, res) => {
    try {
        // console.log(req.body);
        
      let form = new multiparty.Form();
      let formData = {};
      form.parse(req, async function (err, fields, files) {
        Object.keys(fields).forEach(function (name) {
          formData[name] = fields[name][0];
        });
        formData.image = files.image.map((file) => file.path);
        console.log(files);
        let data = new productModel(formData)
        let result = await data.save()
        res.status(200).json({message:'Product added successfully',error:false,success:true,data:result})
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
        error: true,
        success: false,
        data: null,
      });
    }
  };

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
      cb(null, "uploads"); // specify the uploads directory
    },
    filename: (req, file, cb) => {
        console.log(file);
        
      cb(null, Date.now() + "-" + file.originalname); // unique filename
    },
  });
  const upload = multer({ storage: storage });

  return { createProduct, upload };
};

module.exports = Product;
