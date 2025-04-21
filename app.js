const express = require("express");
const app = express();

const mongoose = require("mongoose");
require('./DBConnection/DBConnection');

app.use(express.json()); 

const {validateMiddleware} = require('./MiddleWare/validateMiddleware')

const ProductRouter = require("./routes/ProductRouter");
app.use("/product", ProductRouter);

const wishListRouter = require("./routes/WishListRouter");
app.use("/wishList",validateMiddleware, wishListRouter);

const authRouter = require("./routes/AuthRouter");
app.use("/auth", authRouter);

const UserRouter = require('./routes/UserRouter');
app.use("/user",validateMiddleware, UserRouter);

const coupanRouter = require("./routes/CoupanRouter");
app.use("/coupan", coupanRouter);

const shoppingBagRouter = require("./routes/ShoppingBagRouter");
app.use("/shoppingBag", validateMiddleware, shoppingBagRouter);

const ReviewRouter = require("./routes/ReviewRouter");
app.use("/review", ReviewRouter);

const AddreessRouter = require('./routes/AddressRouter');
app.use("/address", validateMiddleware,AddreessRouter);

const OrderIteamRouter = require('./routes/OrderIteamRouter');
app.use("/orderIteam",validateMiddleware, OrderIteamRouter);

const Order = require('./routes/OrderRouter');
app.use("/order",validateMiddleware, Order);


app.listen(7000, () => {
  console.log("server is connected");
});