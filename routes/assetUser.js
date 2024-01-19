const express = require("express");
const router = express.Router();
const Controller = require("../controllers/assetUserController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createAssetUserValidation,
    updateAssetUserValidation,
    validate,
    deleteAssetUserValidation,
    showAssetUserValidation,
    detailAssetUserValidation } = require('../validations/assetUserValidator');
router.use(authMiddleware);
router.get("/", showAssetUserValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailAssetUserValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createAssetUserValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateAssetUserValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteAssetUserValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;