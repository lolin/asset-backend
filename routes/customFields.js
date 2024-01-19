const express = require("express");
const router = express.Router();
const Controller = require("../controllers/customFieldController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createCustomFieldValidation,
    updateCustomFieldValidation,
    validate,
    deleteCustomFieldValidation,
    showCustomFieldValidation,
    detailCustomFieldValidation } = require('../validations/customFieldValidator');
router.use(authMiddleware);
router.get("/", showCustomFieldValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailCustomFieldValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createCustomFieldValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateCustomFieldValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteCustomFieldValidation(), validate, errorMiddleware(Controller.destroy));
router.get("/get-by-model/data", errorMiddleware(Controller.getByModel));
module.exports = router;