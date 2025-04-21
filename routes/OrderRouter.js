const express = require("express");

const router = express.Router();

const OrderController = require('../Controller/OrderController');

router.get("/getallorder", OrderController.getOrder);
router.post("/addorder", OrderController.postOrder);
router.put("/updateorder/:userId", OrderController.updateOrder);
router.delete("/deleteorder/:id", OrderController.deleteOrder);

module.exports = router;