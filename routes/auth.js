const express = require("express");
const router = express.Router();

const Controller = require("../controllers/auth.controller");

router.post("/", Controller.login);
module.exports = router;