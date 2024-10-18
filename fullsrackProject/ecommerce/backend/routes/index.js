const express = require("express");
const router = express.Router();
const userSignup = require("../controller/userSignup");
const userLogin = require("../controller/userSignin");
const userDetail = require("../controller/userDetail");
const authToken = require("../middleware/authToken");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");
const product = require("../controller/product");
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/user-detail", authToken, userDetail);

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
router.put("/product/update/:id", authToken,product().upload.array("image", 10), product().updateProduct);
router.delete("/product/delete/:id", authToken, product().deleteProduct);
module.exports = router;
