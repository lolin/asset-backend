const express = require("express");
const router = express.Router();

const Controller = require("../controllers/customfield.controller");

router.get("/", Controller.showAll);
router.get("/:id", Controller.getDataById);
router.post("/", Controller.store);
router.patch("/:id", Controller.update); //params berupa id
router.delete("/:id", Controller.destroy);
module.exports = router;