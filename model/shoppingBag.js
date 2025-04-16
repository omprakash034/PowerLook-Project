const mongoose = require('mongoose');

const shoppingBagSchema = mongoose.Schema({


    productId: { type: Number, required: true },
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    productSize: { type: String, required: true },
    productColor: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    userId: { type: Number, required: true },

});

module.exports = mongoose.model("shoppingBag", shoppingBagSchema);


