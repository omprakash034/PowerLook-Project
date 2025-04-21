const mongoose = require("mongoose");

const shoppingBag = require('../model/shoppingBag');

exports.getShoppingBag = (req, res) => {
  res.send("Shopping Bag");
};

exports.getAllShoppingBag =async (req, res) => {
  const id = req.id;
  console.log(id);
  const Bag = await shoppingBag.find({userId : id });

  console.log(Bag);

  res.status(200).json({
    status : "success", 
    message : "fecth data successfully",
    data : Bag 
  })
};

exports.postShoppingBag = async (req, res) => {
  try {
    const userId = req.id

    const {productId, productName,  productImage,  productSize,  productColor, quantity, price, stock} = req.body;

    if(!productId ||
       !productName ||
       !productImage ||
       !productSize ||
       !productColor ||
       !quantity ||
       !price ||
       !stock)
      {
       res.status(400).jason({message: "product is invalid"});
      }
      const newBag = new shoppingBag({productId, productName,  productImage,  productSize,  productColor, quantity, price, stock, userId});
      
      await newBag.save();
      res.status(200).json({message:"Bag Product Added succsessfully", shoppingBag: newBag})

    }
     catch (error) 
    {
    console.log(error);
    res.status(500).json({message: "internal server error"});
    }
  
};

/*exports.updateShoppingBag = async (req, res) => {
  try {
    const {id} = req.params;

    const {productId, productName,  productImage,  productSize,  productColor, quantity, price, stock, userId} = req.body;

    const bagUpdate = await shoppingBag.findByIdAndUpdate(id,{productId, productName,  productImage,  productSize,  productColor, quantity, price, stock, userId});
    
    if(!bagUpdate)return res.status(404).json({message:"Bag Not Found"});
   await bagUpdate.save();
   res.status(200).json({message: "shopping Bag Updated", shoppingBag: bagUpdate});

  } 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({message: "internal server error"});
  }
  
};*/


exports.deleteShoppingBag = async (req, res) => {
  try 
  {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message: "invalid Product Id"});
    }
    const deleteShoppingBag = await shoppingBag.findByIdAndDelete(id);

    if(!deleteShoppingBag)return res.status(404).json({message:"Shopping Bag is not found!"});res.status(200).json({message:"Shopping Bag Deleted", shoppingBag: deleteShoppingBag});
   }
  catch (error) 
  {
    console.log(error);
    res.status(500).json({message: "internal server error"});
  }
};

