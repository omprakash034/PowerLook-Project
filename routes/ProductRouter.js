const express = require("express");

const router = express.Router();

const ProductController = require("../Controller/ProductController");

router.get("/product", ProductController.getWelcome)
router.get("/getproduct", ProductController.getProduct);
router.get("/getproduct/:id", ProductController.getProductById);
router.post("/postproduct", ProductController.postProduct);
router.put("/updateproduct/:id", ProductController.putProduct);
router.delete("/deleteproduct/:id", ProductController.deleteProduct);

module.exports = router;