const express = require("express");

const router = express.Router();

const AddressController = require('../Controller/AddreessController');

router.get("/getAddress", AddressController.getAddress );
router.get("/getAllAddress", AddressController.getAllAddress);
router.post("/addAddress", AddressController.postAddress);
router.put("/updateAddress/:userId", AddressController.updateAddress);
router.delete("/deleteAddress/:id", AddressController.deleteAddress);


module.exports = router;