const express = require("express");
const router = express.Router();
const Controller = require("../controllers/manufacturerController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createManufacturerValidation,
    updateManufacturerValidation,
    validate,
    deleteManufacturerValidation,
    showManufacturerValidation,
    detailManufacturerValidation } = require('../validations/manufacturerValidator');
router.use(authMiddleware);
router.get("/",
    showManufacturerValidation(),
    validate,
    errorMiddleware(Controller.show));
router.get("/all",
    errorMiddleware(Controller.showAll));
router.get("/:id",
    detailManufacturerValidation,
    validate,
    errorMiddleware(Controller.getDataById));
router.post("/",
    createManufacturerValidation(),
    validate,
    errorMiddleware(Controller.store));
router.patch("/:id",
    updateManufacturerValidation(),
    validate,
    errorMiddleware(Controller.update)); //params berupa id
router.delete("/:id",
    deleteManufacturerValidation(),
    validate,
    errorMiddleware(Controller.destroy));
module.exports = router;