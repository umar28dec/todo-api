'use strict';

const express = require("express");
const router = express.Router();

const {registerUser, login} = require("../controllers/user.controller");

const {registerValidator, loginValidator} = require('../middleware/validators/userValidator.middleware');

router.post("/user/registration", registerValidator, registerUser);
router.post("/user/login", loginValidator, login)

module.exports = router;
