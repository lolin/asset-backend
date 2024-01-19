const express = require("express");
const router = express.Router();
const Controller = require("../controllers/fieldsetController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createFieldsetValidation,
    updateFieldsetValidation,
    validate,
    deleteFieldsetValidation,
    showFieldsetValidation,
    detailFieldsetValidation } = require('../validations/fieldsetValidator');
router.use(authMiddleware);
router.get("/", showFieldsetValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailFieldsetValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createFieldsetValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateFieldsetValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteFieldsetValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;