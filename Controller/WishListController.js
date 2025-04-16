const mongoose = require("mongoose");

const wishList = require('../model/wishList');

const { setDefaultAutoSelectFamily } = require("net");

exports.getWishList =  (req, res) => {
  res.send("this is an wishList Of my Product Iteam");
};

exports.getProductWishList = async (req, res) => {
  const WishList = await wishList.find();
  res.status(200).json({
    status : "sucess",
    message : "WishList fetch successfully",
    data : WishList

  })
};


exports.addPoductWishList = async (req, res) => {
  try {
    const{ productName,productImage,productDescription,price,category_name, category_id,size, retail_price, stock, quantity, user_id}= req.body;

    if(!productName ||
      !productImage ||
      !productDescription ||
      !price ||
      !category_name ||
      !category_id ||
      !size ||
      !retail_price ||
      !stock ||
      !quantity ||
      !user_id){
        return res.status(400).json({message: "This product data is not valid"});
      }

      const newWishList = new wishList({productName,productImage,productDescription,price,category_name, category_id,size, retail_price, stock, quantity, user_id});
      await newWishList.save();
      res.status(201).json({message:"wishlist created succesfully", wishList: newWishList});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"internal server error"})
  }
};

exports.deleteWishList = async(req, res) => {
  try {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message:"invalid wishlist Id"});
    }
    const deleteWishList = await wishList.findByIdAndDelete(id);
    if(!deleteWishList) return res.status(404).json({message: "wishlist  is not found"});
    res.status(200).json({message:"user deleted successfully!", wishList: deleteWishList});
    }
    
   catch (error) {
    console.log(error);
    res.status(500).json({message: "internal server error"});
  }
};