const express = require("express");

const router = express.Router();

 const ReviewController = require('../Controller/ReviewController');

 router.get("/getreview", ReviewController.getreview);
 router.get("/allreview", ReviewController.getAllReviews);
 router.get("/getreview/:id", ReviewController.getAllReviewsById);
 router.get("/gettittle/:title", ReviewController.getAllReviewsByTittle);
 router.post("/postreview", ReviewController.postReview);
 router.put("/updatereview/:id", ReviewController.updateReview);
 router.delete("/deletereview/:id", ReviewController.deleteReview);

 module.exports = router;
