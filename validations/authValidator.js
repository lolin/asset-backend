const { body, param, query, validationResult } = require("express-validator");

const loginValidation = () => {
    return [
        body("username")
            .exists({ checkFalsy: true }).withMessage("Username is required")
            .isEmail().withMessage("Please input valid email"),
        body("password")
            .exists({ checkFalsy: true }).withMessage("Password is required")
    ];
}
const logoutValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    loginValidation,
    logoutValidation,
    validate
}