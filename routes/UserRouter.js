const express = require('express');

const router = express.Router();

const {validateMiddleware} = require('../MiddleWare/validateMiddleware')

const UserController = require('../Controller/UserController');

router.get('/getUser', UserController.getUser);
router.get('/getAllUser', UserController.getAllUser); 
router.post('/addUser', UserController.postUser);     
router.put('/updateUser/:id', UserController.updateUser);
module.exports = router;


