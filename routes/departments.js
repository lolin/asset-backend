const express = require("express");
const router = express.Router();
const Controller = require("../controllers/departmentController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createDepartmentValidation,
    updateDepartmentValidation,
    validate,
    deleteDepartmentValidation,
    showDepartmentValidation,
    detailDepartmentValidation } = require('../validations/departmentValidator');
router.use(authMiddleware);
router.get("/", showDepartmentValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailDepartmentValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createDepartmentValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateDepartmentValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteDepartmentValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;