const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewTitle : {type:String , required :true},
  reviewRating :{type :Number , required :true},
  reviewFile :  {type :String , required :true},
  reviewPostedBy : {type :String , required :true},
  reviewPostedDate :{type:Date ,default: Date.now()},
  reviewDescription : {type:String , required :true},
 
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    }
});

module.exports = mongoose.model("reviews", reviewSchema)
