const express = require("express");
const router = express.Router();
const Controller = require("../controllers/EmailListController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createEmailListValidation,
    updateEmailListValidation,
    validate,
    deleteEmailListValidation,
    showEmailListValidation,
    detailEmailListValidation } = require('../validations/EmailListValidator');
router.use(authMiddleware);
router.get("/", showEmailListValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailEmailListValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createEmailListValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateEmailListValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteEmailListValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;