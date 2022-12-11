const express = require("express");
const router = express.Router();
const { createProduct, getproduct, userSelectProduct, updateproduct, deleteproduct } = require("../controller/productController");


router.post("/createproduct/", createProduct);
router.get("/getallproduct", getproduct);
router.get("/userSelectProduct/:id", userSelectProduct);
router.post("/updateproduct/:id", updateproduct);
router.delete("/deleteproduct/:id", deleteproduct);
module.exports = router;