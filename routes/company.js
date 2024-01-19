const express = require("express");
const router = express.Router();
const Controller = require("../controllers/companyController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createCompanyValidation,
    updateCompanyValidation,
    validate,
    deleteCompanyValidation,
    showCompanyValidation,
    detailCompanyValidation } = require('../validations/companyValidator');
router.use(authMiddleware);
router.get("/", showCompanyValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailCompanyValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createCompanyValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateCompanyValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteCompanyValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;