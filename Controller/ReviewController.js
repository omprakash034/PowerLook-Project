const mongoose = require('mongoose');


const reviews = require('../model/reviews');

exports.getreview = (req, res) => {
res.send("this is a Reviews section");
};

exports.getAllReviews = async (req, res) => {
  const review = await reviews.find();
  res.status(200).json({
    status: "success",
    message: "Successfully Get All Reviews",
    data: review
  })
};


exports.getAllReviewsById = async (req, res) => {
  const {id} = req.params;
  const Review = await reviews.findById(id);
  res.status(200).json({
    status: "success",
    message: "Successfully Get All Reviews",
    data: Review
  })
};


exports.getAllReviewsByTittle = async (req, res) => {
  const {title} = req.params;
  const Reviews = await reviews.findOne({reviewTitle: title});
  res.status(200).json({
    status: "success",
    message: "Successfully Get All Reviews",
    data: Reviews
  })
};


exports.postReview = async (req, res) => {
try {
  const{reviewTitle, reviewRating, reviewFile, reviewPostedBy,reviewDescription, product} = req.body;
  if(!reviewTitle ||
     !reviewRating ||
     !reviewFile ||
     !reviewPostedBy ||
     !reviewDescription ||
     !product
    )
    {
      return res.status(400).json({message: "invalid Review Data is not valid"});
    }
    const newReview = new reviews({reviewTitle, reviewRating, reviewFile, reviewPostedBy,reviewDescription, product});
    await newReview.save();
    res.status(200).json({message: "Review Data Fetch successfully", reviews: newReview})
  
} 
catch (error) 
{
  console.log(error);
  res.status(500).json({message: "Internal server Error"});
}
};

exports.updateReview = async (req, res) => {
  try 
  {
    const {id} = req.params;

     const {reviewTitle, reviewRating, reviewFile, reviewPostedBy,reviewDescription, product} = req.body;

     const updateReviews = await reviews.findByIdAndUpdate(id,{reviewTitle, reviewRating, reviewFile, reviewPostedBy,reviewDescription, product});
    
     if(!updateReviews)return res.status(404).json({message: "Reviews option not Found"})
     await updateReviews.save();
     res.status(200).json({message:"Reviews Updated Successfully", reviews: updateReviews})
} 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({message: "Internal server error"})
  }
  
};

exports.deleteReview = async (req, res) => {
  try {
    const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({message:"Invalid Review Id"});

  const deleteReview = await reviews.findByIdAndDelete(id);

  if(!deleteReview)return res.status(400).json({message: "Review Id is not found"})
    return res.status(200).json({message: "Review Successfully Deleted", reviews: deleteReview})
  } 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({message:"Internal server Error"})
  }
  
};

