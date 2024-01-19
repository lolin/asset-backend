const express = require("express");
const router = express.Router();
const Controller = require("../controllers/assetController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createAssetValidation,
    updateAssetValidation,
    validate,
    deleteAssetValidation,
    showAssetValidation,
    detailAssetValidation } = require('../validations/assetValidator');
router.use(authMiddleware);
router.get("/", showAssetValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/lastid", errorMiddleware(Controller.getLastId));
router.get("/:id", detailAssetValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createAssetValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateAssetValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteAssetValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;