const express = require("express");
const router = express.Router();
const Controller = require("../controllers/assetStatusController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createAssetStatusValidation,
    updateAssetStatusValidation,
    validate,
    deleteAssetStatusValidation,
    showAssetStatusValidation,
    detailAssetStatusValidation } = require('../validations/assetStatusValidator');
router.use(authMiddleware);
router.get("/", showAssetStatusValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/lastid", errorMiddleware(Controller.getLastId));
router.get("/:id", detailAssetStatusValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createAssetStatusValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateAssetStatusValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteAssetStatusValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;