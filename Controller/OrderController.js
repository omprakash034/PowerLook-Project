const mongoose = require('mongoose');

const order = require('../model/order');
const orderIteam = require('../model/orderIteam');

exports.getOrder =async (req, res) => {
  const id = req.id;
  console.log(id);
  const Order = await order.find({userId : id });

  console.log(Order);

  res.status(200).json({
    status : "success", 
    message : "fecth data successfully",
    data : Order 
  })
};


exports.postOrder = async (req, res) => {
  try {
    const userId = req.id;
    const { userAddress, phoneNumber, email, paymentType, totalAmount } = req.body;
    const orderItemsBody = req.body.orderItems;

    if (!userAddress || !phoneNumber || !email || !paymentType || !totalAmount || !Array.isArray(orderItemsBody) || orderItemsBody.length === 0) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    let orderItemIdsArray = new Array(orderItemsBody.length);

    for (let i = 0; i < orderItemsBody.length; i++) {
      const newOrderItem = new orderIteam(orderItemsBody[i]);
      const retain = await newOrderItem.save();
      orderItemIdsArray[i] = retain._id;
    }

    const orderEntity = new order({
      userId,
      userAddress,
      phoneNumber,
      email,
      paymentType,
      totalAmount,
      orderItems: orderItemIdsArray  // use correct field name for schema
    });

    const savedOrder = await orderEntity.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const userId = req.id;

    const { userAddress, phoneNumber, email, paymentType, totalAmount,orderItemsBody
    }  = req.body;

    const updateFields = {
      ...(userAddress && { userAddress }),
      ...(phoneNumber && { phoneNumber }),
      ...(email && { email }),
      ...(paymentType && { paymentType }),
      ...(totalAmount && { totalAmount }),
    };

    let orderItemIdsArray;

    if (Array.isArray(orderItemsBody) && orderItemsBody.length > 0) {
      orderItemIdsArray = [];

      for (let i = 0; i < orderItemsBody.length; i++) {
        const newOrderItem = new orderIteam(orderItemsBody[i]);
        const savedItem = await newOrderItem.save();
        orderItemIdsArray.push(savedItem._id);
      }

      updateFields.orderItems = orderItemIdsArray;
    }

    const updatedOrder = await order.findOneAndUpdate(
      { userId },
      updateFields,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found for the user" });
    }

    res.status(200).json({
      status: "success",
      message: "Order updated successfully",
      data: updatedOrder
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteOrder = async(req, res) => {
 try {
  
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message: "invalid Product Id"});
  }

  const deleteOrder = await order.findOneAndDelete(id)
  if(!deleteOrder){
     res.status(404).json({message:"order is not found"})
  }
  else{
    res.status(200).json({message:"Order is delete Successfully", order:deleteOrder})
  }
} catch (error) {
  res.status(500).json({message: "internal server error"})
}


}
