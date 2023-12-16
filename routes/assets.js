const express = require("express");
const router = express.Router();

const Controller = require("../controllers/asset.controller");

router.get("/", Controller.showAll);
router.get("/lastid", Controller.getLastId);
router.get("/:id", Controller.getDataById);
router.post("/", Controller.store);
router.patch("/:id", Controller.update); //params berupa id
router.delete("/:id", Controller.destroy);
module.exports = router;