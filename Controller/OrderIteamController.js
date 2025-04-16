const mongoose = require("mongoose");

const orderIteam = require('../model/orderIteam');

exports.getOrderIteam = (req, res) => 
{
 res.send("Iteam are Availabe in PowerLook");
};

exports.getAllOrderIteam = async (req, res) => {
  try 
  {
    const Iteams = await orderIteam.find();
  if(!Iteams)
    {
      res.status(404).json({message: "All Iteam Are Not Found "});
    }
  else
    {
     res.status(200).json({
      status: "Success",
      message: "All Iteam Are Avialable",
      data: Iteams
    });
    }
    
  } 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({message: "internal server error"});
  }

};


exports.postOrderIteam = async (req, res) => {
  try
  {
    const {productId, productName, quantity, productSize, productColor, price, category, image, description} = req.body;

    if(!productId ||
    !productName ||
    !quantity || 
    !productSize || 
    !productColor || 
    !price || 
    !category || 
    !image || 
    !description)
    {
      return res.status(400).json({message: "Order Iteam Invalid"});
    }

    const newOrderIteam = new orderIteam({productId, productName, quantity, productSize, productColor, price, category, image, description});
   
    if(!newOrderIteam) return res.status(404).json({message: "OderIteam is not Found"});

    await newOrderIteam.save();
    res.status(200).json({message: "OrderIteam Is Added", orderIteam: newOrderIteam})
  }
  catch(error)
  {
    res.status(500).json({message: "internal server error"})
  }  
};


exports.updateOrderIteam = async (req, res) => {
try
{  
  const {id} = req.params;

  const{productId, productName, quantity, productSize, productColor, price, category, image, description} = req.body;

  const updateOrderIteam = await orderIteam.findByIdAndUpdate(id,{productId, productName, quantity, productSize, productColor, price, category, image, description});

  if(!updateOrderIteam)return res.status(400).json({message: "OderIteam is not found"})

    await updateOrderIteam.save();
    res.status(200).json({message:"OrderIteam Successfully Updated!", orderIteam: updateOrderIteam})
}
catch(error)
{
  console.log(error);
  res.status(500).json({message: "internal server error"});
}
};

exports.deleteOrderIteam = async (req, res) => {
try
{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) 
  return res.status(400).json({message: "Invalid OrderIteam Id"});

  const deleteOrderIteam = await orderIteam.findByIdAndDelete(id);

  if(!deleteOrderIteam)return res.status(404).json({message:"OrderIteam is Not Found"})
  res.status(200).json({message: "OrderIteam Successfully Deleted!"})
}
catch(error)
{
  console.log(error);
  res.status(500).json({message: "internal server error"});
}
};