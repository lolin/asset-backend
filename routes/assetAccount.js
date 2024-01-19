const express = require("express");
const router = express.Router();
const Controller = require("../controllers/assetaccountController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createAssetAccountValidation,
    updateAssetAccountValidation,
    validate,
    deleteAssetAccountValidation,
    showAssetAccountValidation,
    detailAssetAccountValidation } = require('../validations/assetAccountValidator');
router.use(authMiddleware);
router.get("/", showAssetAccountValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailAssetAccountValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createAssetAccountValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateAssetAccountValidation(), validate, errorMiddleware(Controller.update)); //params berupa id
router.delete("/:id", deleteAssetAccountValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;