const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  productName:{type: String, required: true} ,
  productImage: {type: String, required: true},
  productDescription:{type: String, required: true},
  price: {type: Number, required: true},
  category_name: {type: String, required: true},
  category_id: {type: Number, required: true},
  size:{type: String, required: true},
  retail_price: {type: String, required: true},
  stock: {type: String, required: true},
  quantity: {type: Number, required: true},
  user_id: {type: Number, required: true}
})

const WishList = mongoose.model("wishList", wishListSchema)
module.exports = WishList;