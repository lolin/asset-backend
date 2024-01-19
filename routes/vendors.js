const express = require("express");
const router = express.Router();
const Controller = require("../controllers/vendorController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createVendorValidation,
    updateVendorValidation,
    validate,
    deleteVendorValidation,
    showVendorValidation,
    detailVendorValidation } = require('../validations/vendorValidator');
router.use(authMiddleware);
router.get("/", showVendorValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailVendorValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createVendorValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateVendorValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteVendorValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;