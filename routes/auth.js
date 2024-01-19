const express = require("express");
const router = express.Router();
const Controller = require("../controllers/authController");
const errorMiddleware = require('../middleware/errorMiddleware');
const { loginValidation,
    validate } = require('../validations/authValidator');
router.post("/", loginValidation(), validate, errorMiddleware(Controller.login));
module.exports = router;