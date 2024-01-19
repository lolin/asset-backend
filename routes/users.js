const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userController");
const authMiddleware = require('../middleware/accessValidation');
const errorMiddleware = require('../middleware/errorMiddleware');
const { createUserValidation,
    updateUserValidation,
    validate,
    deleteUserValidation,
    showUserValidation,
    detailUserValidation } = require('../validations/userValidator');

router.use(authMiddleware);
router.get("/", showUserValidation(), validate, errorMiddleware(Controller.show));
router.get("/all", errorMiddleware(Controller.showAll));
router.get("/:id", detailUserValidation(), validate, errorMiddleware(Controller.getDataById));
router.post("/", createUserValidation(), validate, errorMiddleware(Controller.store));
router.patch("/:id", updateUserValidation(), validate, errorMiddleware(Controller.update));
router.delete("/:id", deleteUserValidation(), validate, errorMiddleware(Controller.destroy));
module.exports = router;