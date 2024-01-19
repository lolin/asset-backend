const express = require("express");
const router = express.Router();
const Controller = require("../controllers/conditionController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createConditionValidation,
    updateConditionValidation,
    validate,
    deleteConditionValidation,
    showConditionValidation,
    detailConditionValidation } = require('../validations/conditionValidator');
router.use(authMiddleware);
router.get("/", showConditionValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailConditionValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createConditionValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateConditionValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteConditionValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;