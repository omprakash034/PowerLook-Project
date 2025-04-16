const express = require("express");

const router = express.Router();

const ProductRouter = require("./ProductRouter");
 router.use("/", ProductRouter);

 const wishListRouter = require('./WishListRouter');
router.use("/", wishListRouter);

 const userRouter = require('./UserRouter');
router.use("/", userRouter);

const coupanRouter = require('./CoupanRouter');
router.use("/", coupanRouter);

const shoppingBagRouter = require('./ShoppingBagRouter');
router.use("/", shoppingBagRouter);




module.exports = router; 
