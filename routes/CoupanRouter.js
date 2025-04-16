const express = require("express");

const router = express.Router();

const CoupanController = require('../Controller/CoupanController');

router.get("/getcoupan", CoupanController.getcoupan);
router.get("/getallcopuan", CoupanController.getAllCoupan);
router.post("/coupan/create-coupan", CoupanController.createCoupans);
router.put("/updatecoupan/:id", CoupanController.updateCoupan);
router.delete("/deletecoupan/:id", CoupanController.deleteCoupan);


module.exports = router;
