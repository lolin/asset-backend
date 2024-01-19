const express = require("express");
const router = express.Router();
const Controller = require("../controllers/assetModelController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createAssetModelValidation,
    updateAssetModelValidation,
    validate,
    deleteAssetModelValidation,
    showAssetModelValidation,
    detailAssetModelValidation } = require('../validations/assetModelValidator');
router.use(authMiddleware);
router.get("/", showAssetModelValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailAssetModelValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createAssetModelValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateAssetModelValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteAssetModelValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;