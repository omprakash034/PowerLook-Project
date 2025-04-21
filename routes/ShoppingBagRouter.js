const express = require("express");

const router = express.Router();

const ShoppingBagController = require('../Controller/ShoppingBagController') 



router.get("/getbags", ShoppingBagController.getShoppingBag);
router.get("/getallbags", ShoppingBagController.getAllShoppingBag);
router.post("/addbags", ShoppingBagController.postShoppingBag);
//router.put("/updatebags/:id", ShoppingBagController.updateShoppingBag);
router.delete("/deletebags/:id", ShoppingBagController.deleteShoppingBag);

module.exports = router;