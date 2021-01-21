const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const UserController = require("../app/api/controller/users");
var cheakauth=require('../auth')
router.post("/register",UserController.insertUser);
router.post("/login",UserController.login);
module.exports = router;