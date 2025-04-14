const express = require('express');
const router = express.Router();
const userController = require('./user.controller');  
const loginUser = require('./user.controller'); 
const authenticate = require('../middleware/auth.middleware'); 


router.post("/create",userController.createUser);
router.post("/login",userController.loginUser)
router.get("/getAllUsers",userController.getAllUsers);
router.delete("/deleteUser/:id",userController.deleteUser);
router.put("/updateUser/:id",userController.updateUser);

module.exports =router;