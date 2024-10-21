const categoryModel = require("../models/category");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const category = () => {
  // create Category
  const createCategory = async (req, res) => {
    try {
      const {name , status} = req.body;
      const category = new categoryModel({
        name,
        status,
        image: req.files.map((file) => `${file.path}`),
      });
      const result = await category.save();
      res.status(201).json({
        message: "Category added successfully",
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
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/category"); // specify the uploads directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // unique filename
    },
  });
  const upload = multer({ storage: storage });

  const allCategory = async (req, res) => {
    try {
      const category = await categoryModel.find({}).sort({ createdAt: -1 });
      let filteredCategory = []
      if (req.query.search) {
        filteredCategory = category.filter(category => 
            category.name.toLowerCase().includes(req.query.search.toLowerCase()) 
        )
      }
      else{
        filteredCategory = category
      }
      
      const allCategory = filteredCategory.map((category) => ({
          ...category,
          image:  category.image.map((image) => `${process.env.BACKEND_URL}/${image}`),
      }))
      res.status(200).json({
        message: "Category fetched successfully",
        error: false,
        success: true,
        data: allCategory,
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

  const updateCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const category = await categoryModel.updateOne({ _id: id }, req.body);
      res
        .status(200)
        .json({
          message: "Category updated successfully",
          error: false,
          success: true,
          data: category,
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
  const deleteCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const existingCategory = await categoryModel.findOne({ _id: id });
      // if category not found
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      // delete image from server
      if (existingCategory.image && existingCategory.image.length > 0) {
        existingCategory.image.forEach((image) => {
          const imagePath = path.join(__dirname, "..", image); // Adjust this path
          console.log(imagePath);          
          fs.unlink(imagePath, (err) => {
            if (err) {
              throw new Error(err)
            }
          });
        });
      }
      const category = await categoryModel.deleteOne({ _id: id });
      res
        .status(200)
        .json({
          message: "Category deleted successfully",
          error: false,
          success: true,
          data: category,
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
  return {
    createCategory,
    upload,
    allCategory,
    updateCategory,
    deleteCategory
  };
};
module.exports = category;
