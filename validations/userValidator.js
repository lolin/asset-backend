const { body, param, query, validationResult } = require("express-validator");

const createUserValidation = () => {
    return [
        body("name")
            .exists({ checkFalsy: true })
            .withMessage("Name is required")
            .isString()
            .withMessage("Name should be string")
            .isLength({ min: 2 })
            .withMessage("Name should be at least 2 characters long"),
        body("email")
            .exists({ checkFalsy: true })
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Please enter a valid email address"),
        body("password")
            .exists({ checkFalsy: true })
            .withMessage("Password is required")
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }).withMessage("Password should be at least 8 characters long and should contain at least one lowercase letter, one uppercase letter, one number, and one symbol"),
    ];
}
const updateUserValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("name")
            .optional()
            .isString()
            .withMessage("Name should be string")
            .isLength({ min: 2 })
            .withMessage("Name should be at least 2 characters long"),
        body("email")
            .optional()
            .isEmail()
            .withMessage("Please enter a valid email address"),
        body("password")
            .optional()
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }).withMessage("Password should be at least 8 characters long and should contain at least one lowercase letter, one uppercase letter, one number, and one symbol"),
    ];
}
const detailUserValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showUserValidation = () => {
    return [
        query("key")
            .isString()
            .withMessage("Key should be string")
            .optional(true),
        query("page")
            .isInt()
            .withMessage("Page should be integer")
            .optional(true),
        query("limit")
            .isInt()
            .withMessage("Limit should be integer")
            .optional(true),
    ];
}
const deleteUserValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("ID is required")
            .isInt()
            .withMessage("ID should be integer"),
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
    createUserValidation,
    updateUserValidation,
    showUserValidation,
    detailUserValidation,
    deleteUserValidation,
    deleteUserValidation,
    validate
}