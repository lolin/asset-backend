const express = require("express");
const router = express.Router();
const Controller = require("../controllers/depreciationController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createDepreciationValidation,
    updateDepreciationValidation,
    validate,
    deleteDepreciationValidation,
    showDepreciationValidation,
    detailDepreciationValidation } = require('../validations/depreciationValidator');
router.use(authMiddleware);
router.get("/", showDepreciationValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailDepreciationValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createDepreciationValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateDepreciationValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteDepreciationValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;