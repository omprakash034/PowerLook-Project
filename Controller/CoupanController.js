const mongoose = require("mongoose");

const coupan = require('../model/coupan');

exports.getcoupan = (req, res) => {
  res.send("Get the Coupan");
};

exports.getAllCoupan = async(req, res) => {
  const Coupans = await coupan.find();
  res.status(200).json({
    status: "successfull",
    message: "coupan fetch successfully",
    data: Coupans
  })  
};

exports.createCoupans = async (req,res)=>{
     try 
    {
    const {coupanName, eligiablePrice, discount} = req.body;
        if(!coupanName || !eligiablePrice || !discount)
         {
         return res.status(400).json({message: "Coupan is not Valid"});
         }
      //console.log("check---1111111", req.body);
  
        const newcoupan = new coupan(req.body);
        await newcoupan.save();
        return res.status(201).json({message: "coupan are availabe", coupan: newcoupan});
     }
      catch (error)
      {
          console.log(error);
          res.status(500).json({message: "internal server error"})
      }
         
    };

    exports.updateCoupan = async (req, res) => {
      try {
        const{id} = req.params;

        const {coupanName, eligiablePrice, discount} = req.body;
        
        console.log(id,coupanName, eligiablePrice, discount );

        const coupanUpdate = await coupan.findByIdAndUpdate(id,{coupanName, eligiablePrice, discount});

        if(!coupanUpdate)return res.status(404).json({message:"Coupan not found"});
        await coupanUpdate.save();
        res.status(200).json({ message: "Coupan updated successfully!", coupan: coupanUpdate});

      } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"})
      }
    };

    exports.deleteCoupan = async(req, res) => {
      try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({message: "invalid coupan Id"});
        }
        
        const deleteCoupan = await coupan.findByIdAndDelete(id);
        
        if(!deleteCoupan) return res.status(404).json({message: "coupan is not found"});
        res.status(200).json({message:"coupan deleted successfully!", coupan: deleteCoupan });
         }
        
       catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"});
      }
    };
