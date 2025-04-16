const mongoose = require("mongoose");

const address = require('../model/address');
const { find } = require("../model/product");

exports.getAddress = (req, res) => {
  res.send("Address Bar PowerLook Shop")
};

exports.getAllAddress = async (req, res) => {
  const Address = await address.find();
  res.status(200).json({
    status:"success",
    message: "Address Fetch Successfully",
    data: Address
})
};

exports.postAddress = async (req, res) => {
 try 
 {
  const {firstName, lastName, email, dob,  mobile_number,  alternate_number, state, postcode, address1,  address2, landmark, instruction, addressType} = req.body;
  
  if(!firstName ||
     !lastName ||
     !email || 
     !dob ||  
     !mobile_number ||  
     !alternate_number || 
     !state ||  
     !postcode || 
     !address1 ||  
     !address2 || 
     !landmark || 
     !instruction || 
     !addressType)
    {
      return res.status(400).json({message: "Adress Fileds Are Invalid"})
    }
    
    const newAddress = new address ({firstName, lastName, email, dob,  mobile_number,  alternate_number, state, postcode, address1,  address2, landmark, instruction, addressType})

    if(!newAddress) 
    {
      return res.status(404).json({message: "Address Is Not Found"})
    }
    else
    {
      await newAddress.save();
      res.status(200).json({message: "Address is Added is Successfully", address: newAddress})
    }
 } 
 catch (error) 
 {
  console.log(error);
  res.status(500).json({message: "internal server error"})
 }
  
};

exports.updateAddress = async (req, res) => {
  try 
  {
    const {id} = req.params;
 
    const {firstName, lastName, email, dob,  mobile_number,  alternate_number, state, postcode, address1,  address2, landmark, instruction, addressType} = req.body;

    const updateAddress = await address.findByIdAndUpdate(id,{firstName, lastName, email, dob,  mobile_number,  alternate_number, state, postcode, address1,  address2, landmark, instruction, addressType});

    if(!updateAddress)
    {
     return res.status(404).json({message: "Adress is Not Found"})
    }
    else
    {
     await updateAddress.save();
     res.status(200).json({message: "Address is An Updated!", address: updateAddress})
    } 
  } 
  
  catch (error) 
  {
    console.log(error);
    res.status(500).json({message: "internal server error"})
  }
 };

 
 
 exports.deleteAddress = async (req, res) => {
  try
  {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id))
  {
    return res.status(404).json({message: "Invalid Address Id"});
  }
  
  const deleteAddress = await address.findByIdAndDelete(id)
  if(!deleteAddress)
  {
    return res.status(400).json({mesage: "Address Is Not Found"});
  }
  else
  {
    return res.status(200).json({message: "Address Is Deleted Successfully!", address: deleteAddress});
  }
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({message: "Internal Server Error"});
  }
 }

