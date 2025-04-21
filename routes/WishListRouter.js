const express = require("express");

const router = express.Router();

const WishListController = require('../Controller/WishListController');

router.get("/gethome", WishListController.getWishList);
router.get("/getwishlist", WishListController.getProductWishList);
router.post("/postwishlist", WishListController.addPoductWishList);
router.delete("/deletewishlist/:id", WishListController.deleteWishList);

module.exports = router;