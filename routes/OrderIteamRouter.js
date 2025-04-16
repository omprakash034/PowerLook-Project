const express = require("express");

const router = express.Router();

const OrderIteamController = require('../Controller/OrderIteamController');

router.get("/getIteam" , OrderIteamController.getOrderIteam);
router.get("/getAllIteam", OrderIteamController.getAllOrderIteam);
router.post("/addOrderIteam", OrderIteamController.postOrderIteam);
router.put("/updateOrderIteam/:id", OrderIteamController.updateOrderIteam);
router.delete("/deleteOrderIteam/:id", OrderIteamController.deleteOrderIteam);

module.exports = router;
