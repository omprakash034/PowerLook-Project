const express = require("express");

const router = express.Router();

const ProductRouter = require("./ProductRouter");
 router.use("/product", ProductRouter);

 const wishListRouter = require('./WishListRouter');
router.use("/wishList", wishListRouter);

 const authRouter = require('./UserRouter');
router.use("/auth", authRouter);

const coupanRouter = require('./CoupanRouter');
router.use("/coupan", coupanRouter);

const shoppingBagRouter = require('./ShoppingBagRouter');
router.use("/shopping", shoppingBagRouter);

const ReviewRouter = require('./ReviewRouter');
router.use("/review", ReviewRouter);

const AddreessRouter = require('./AddressRouter');
router.use("/address", AddreessRouter);

const OrderIteamRouter = require('./OrderIteamRouter');
router.use("/orderIteam", OrderIteamRouter);

const UserRouter = require('./UserRouter');
router.use("/user", UserRouter);

const OrderRouter = require('./OrderRouter');
router.use("/order", OrderRouter);


module.exports = router; 
