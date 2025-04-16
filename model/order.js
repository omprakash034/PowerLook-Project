const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({


 
	 userId : { type: Number, required: true },
   userAddress : { type: String, required: true },
	 phoneNumber : { type: String, required: true },
   email : { type: String, required: true },
	 orderItems :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'OrderItems',
        required : true

     },
	 totalAmount : { type: Number, required: true },
	 paymentStatus : { type: String, required: true },
   razorpayOrderId : { type: String, required: true },
   razorpaySignature : { type: String, required: true },
	 orderStatus : { type: String, required: true },
   deliverDate : { type: String, required: true },
	 deliveryDate : { type: Date },
	 razorpayPaymentId : { type: String, required: true },

});

const Orders = mongoose.model('orders',ordersSchem);

module.exports={
    Orders
}