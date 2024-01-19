const express = require("express");
const router = express.Router();
const Controller = require("../controllers/categoryController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createCategoryValidation,
    updateCategoryValidation,
    validate,
    deleteCategoryValidation,
    showCategoryValidation,
    detailCategoryValidation } = require('../validations/categoryValidator');
router.use(authMiddleware);
router.get("/", showCategoryValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailCategoryValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createCategoryValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateCategoryValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteCategoryValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;