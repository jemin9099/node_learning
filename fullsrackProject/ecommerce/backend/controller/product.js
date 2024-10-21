const productModel = require("../models/product");
const fs = require('fs');
const path = require('path');
const multer = require("multer");
const Product = () => {
  // create Product
  const createProduct = async (req, res) => {
    try {
      let productData = req.body;
      productData.image = req.files.map(
        (file) => `${file.path}`
      );
      const product = new productModel(productData);
      const result = await product.save();
      res
        .status(201)
        .json({
          message: "Product added successfully",
          error: false,
          success: true,
          data: result,
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

  // upload image to server
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // specify the uploads directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // unique filename
    },
  });
  const upload = multer({ storage: storage });

  // get all Product
  const getAllProduct = async (req, res) => {
    try {
      const products = await productModel.find({}).sort({ createdAt: -1 });
      let filteredProducts = []
      if (req.query.search) {
         filteredProducts = products.filter(product => 
          product.productName.toLowerCase().includes(req.query.search.toLowerCase()) ||
          product.brandName.toLowerCase().includes(req.query.search.toLowerCase()) ||
          product.category.toLowerCase().includes(req.query.search.toLowerCase())
        )
      }
      else{
        filteredProducts = products
      }
      
      const allProducts = filteredProducts.map((product) => ({
          ...product,
          image:  product.image.map((image) => `${process.env.BACKEND_URL}/${image}`),
      }))
      res
        .status(200)
        .json({
          message: "Products fetched successfully",
          error: false,
          success: true,
          data: allProducts,
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

  // update Product

  const updateProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productModel.updateOne({ _id: id }, req.body);
      res
        .status(200)
        .json({
          message: "Product updated successfully",
          error: false,
          success: true,
          data: product,
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

  // delete Product

  const deleteProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const existingProduct = await productModel.findOne({ _id: id });
      // if product not found
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      // delete image from server
      if (existingProduct.image && existingProduct.image.length > 0) {
        existingProduct.image.forEach((image) => {
          const imagePath = path.join(__dirname, "..", image); // Adjust this path       
          fs.unlink(imagePath, (err) => {
            if (err) {
              throw new Error(err)
            }
          });
        });
      }
      // delete product from database
      const product = await productModel.deleteOne({ _id: id });
      res
        .status(200)
        .json({
          message: "Product deleted successfully",
          error: false,
          success: true,
          data: product,
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
  return { createProduct, upload, getAllProduct, updateProduct, deleteProduct };
};

module.exports = Product;
