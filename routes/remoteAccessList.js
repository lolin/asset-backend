const express = require("express");
const router = express.Router();
const Controller = require("../controllers/remoteAccessListController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createRemoteAccessValidation,
    updateRemoteAccessValidation,
    validate,
    deleteRemoteAccessValidation,
    showRemoteAccessValidation,
    detailRemoteAccessValidation } = require('../validations/remoteAccessValidator');
router.use(authMiddleware);
router.get("/", showRemoteAccessValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailRemoteAccessValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createRemoteAccessValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateRemoteAccessValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteRemoteAccessValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;