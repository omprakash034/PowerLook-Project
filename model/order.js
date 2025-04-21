const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({


 
	 userId: {  type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
            },
    userAddress : { type: String, required: true },
	 phoneNumber : { type: String, required: true },
    email : { type: String, required: true },
	 orderItems :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'OrderItems',
        required : true }],
	 totalAmount : { type: Number, required: true },
    paymentType:{type : String , required: true},
	 paymentStatus : { type: String },
    razorpayOrderId : { type: String},
    razorpaySignature : { type: String},
	 orderStatus : { type: String },
	 deliveryDate : { type: Date },
	 razorpayPaymentId : { type: String},

});

module.exports = mongoose.model('orders', ordersSchema);

