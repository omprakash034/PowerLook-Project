const express = require("express");
const app = express();

const mongoose = require("mongoose");
require('./DBConnection/DBConnection');
app.use(express.json()); 


const ProductRouter = require("./routes/ProductRouter");
app.use("/", ProductRouter);

const wishListRouter = require("./routes/WishListRouter");
app.use("/", wishListRouter);

const userRouter = require("./routes/UserRouter");
app.use("/", userRouter);

const coupanRouter = require("./routes/CoupanRouter");
app.use("/", coupanRouter);

const shoppingBagRouter = require("./routes/ShoppingBagRouter");
app.use("/", shoppingBagRouter);

const ReviewRouter = require("./routes/ReviewRouter");
app.use("/", ReviewRouter);

const AddreessRouter = require('./routes/AddressRouter');
app.use("/", AddreessRouter);

const OrderIteamRouter = require('./routes/OrderIteamRouter');
app.use("/", OrderIteamRouter);


app.listen(7000, () => {
  console.log("server is connected");
});