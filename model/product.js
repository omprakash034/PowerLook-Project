const mongoose = require("mongoose");


//productName,productPrize, productDescription, productDiscount,  productOfferPrice, productCreatedBy,  productCategories,  productSKU,  productCreatedDate,  productImage, productSizeAndStock, reviews, productColor
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrize: { type: Number, required: true },
  productDescription: { type: String, required: true },
  productDiscount: { type: Number, required: true },
  productOfferPrice: { type: Number, required: true },
  productCreatedBy: { type: String, required: true },
  productCategories:[ { type: String, required: true }],
  productSKU: { type: Number, required: true },
  productCreatedDate : {type:Date , default: Date.now },
  productImage: [{ type: String, required: true }],
  productSizeAndStock: {
    type: Map,
    of: Number,
  },
  reviews: [
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'reviews'
     }
   ],
   productCol: {type: String, required: true},
   productColor : {
    type : Map,
    of: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      }
},
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
