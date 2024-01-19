const express = require("express");
const router = express.Router();
const Controller = require("../controllers/assettypeController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createAssetTypeValidation,
    updateAssetTypeValidation,
    validate,
    deleteAssetTypeValidation,
    showAssetTypeValidation,
    detailAssetTypeValidation } = require('../validations/assetTypeValidator');
router.use(authMiddleware);
router.get("/", showAssetTypeValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailAssetTypeValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createAssetTypeValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateAssetTypeValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteAssetTypeValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;