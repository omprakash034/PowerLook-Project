const mongoose = require('mongoose');

const OrderItemsSchema = mongoose.Schema({


   productId :  { type: Number, required: true },
	 productName :  { type: String, required: true },
	 quantity :  { type: Number, required: true },
	 productSize :  { type: String, required: true },
   productColor :  { type: String, required: true },
	 price :  { type: Number, required: true },
   category :  { type: String, required: true },
   image :  { type: String, required: true },
	 description :  { type: String, required: true }

});

const OrderItems = mongoose.model("orderIteam", OrderItemsSchema);

module.exports = {
  OrderItems
};