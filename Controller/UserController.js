const mongoose = require("mongoose");

const user = require('../model/users');

exports.getUser = (req, res) => {
res.send("Get User");
};

exports.getAllUser = async(req, res) => {
const User = await user.find();
res.status(200).json({
  status: "success",
  message:"Success Get User", 
  data: User
})
};

exports.postUser = async(req, res) => {
try
{
  const id = req.id;
   const currentUser = user.findById(id);
   console.log(currentUser);
  
  const{firstName, lastName, email,  dob,  alt_number,  number,  gender,  role,  address,  createdDate } = req.body;

  if(!firstName ||  
    !lastName ||
    !email ||  
    !dob ||  
    !alt_number ||  
    !number || 
    !gender ||  
    !role ||  
    !address ||  
    !createdDate)
    {
      return res.status(400).json({message: "Invalid User Fields"}); 
    }

    const newUser = new user({firstName, lastName, email,  dob,  alt_number,  number,  gender,  role,  address, createdDate})

    if(!newUser) return res.status(404).json({message: "User Not Found"});
    await newUser.save();
    res.status(200).json({message: "User is Successfully Added", user: newUser})
}
catch(error)
{
  return res.status(500).json({ message: "Internal server error" });
}    
};


exports.updateUser = async (req, res) => {
  try {
    const id = req.id;
    const currentUser = user.findById(id);
    console.log(currentUser);

    const{firstName, lastName, email,  dob,  alt_number,  number,  gender,  role,  address,  createdDate} = req.body;
     
    const updateUser = await user.findByIdAndUpdate(id,{firstName, lastName, email,  dob,  alt_number,  number,  gender,  role,  address,  createdDate});

    if(!updateUser)return res.status(404).json({message:"User not Found"});

    await updateUser.save();
    res.status(200).json({message: "User Is Updated Sucessfully", user: updateUser});

 } catch (error) {
    res.status(500).json({message:"Internal server error"})
  }
}
