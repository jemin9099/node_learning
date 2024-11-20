const express = require("express");
const router = express.Router();
const userSignup = require("../controller/userSignup");
const userLogin = require("../controller/userSignin");
const userDetail = require("../controller/userDetail");
const authToken = require("../middleware/authToken");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");
const product = require("../controller/product");
const category = require("../controller/category");
const forgotPassword = require("../controller/forgotPassword"); 

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/user-detail", authToken, userDetail);
router.post('/requestPasswordReset', forgotPassword().requestPasswordReset);
router.post('/resetPassword/:id/:token', forgotPassword().resetPassword);

// admin-panel

router.get("/users", authToken, allUsers);
router.put("/update-user/:id", authToken, updateUser);

// product

router.post(
  "/product/create",
  authToken,
  product().upload.array("image", 10),
  product().createProduct
);

router.get("/products", authToken, product().getAllProduct);
router.get("/product/:id", authToken, product().getById);
router.put("/product/update/:id", authToken,product().upload.array("image", 10), product().updateProduct);
router.delete("/product/delete/:id", authToken, product().deleteProduct);

// category 

router.post("/category/create", authToken, category().upload.array("image", 10), category().createCategory)
router.get("/category", authToken, category().allCategory)
router.put("/category/update/:id", authToken, category().upload.array("image", 10), category().updateCategory)
router.delete("/category/delete/:id", authToken, category().deleteCategory);

// category by products
router.get("/products/category/:categoryId", authToken, product().productByCategory)
module.exports = router;
