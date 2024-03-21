const { body, param, query, validationResult } = require("express-validator");

const createEmailListValidation = () => {
    return [
        body("departmentId")
            .optional({ checkFalsy: true })
            .isInt().withMessage("Department should be integer"),
        body("employeeName")
            .exists({ checkFalsy: true }).withMessage("Employee Name is required")
            .isString().withMessage("Employee Name should be string")
            .isLength({ min: 5 }).withMessage("Employee Name should be 5 characters"),
        body("email")
            .exists({ checkFalsy: true }).withMessage("Email is required")
            .isString().withMessage("Email should be string")
            .isLength({ min: 2 }).withMessage("Email should be 5 characters"),
        body("password")
            .exists({ checkFalsy: true }).withMessage("Password is required")
            .isString().withMessage("Password should be string"),

    ];
}
const updateEmailListValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("departmentId")
            .optional()
            .isInt().withMessage("Department should be integer"),
        body("employeeName")
            .exists({ checkFalsy: true }).withMessage("Employee Name is required")
            .isString().withMessage("Employee Name should be string")
            .isLength({ min: 5 }).withMessage("Employee Name should be 5 characters"),
        body("email")
            .exists({ checkFalsy: true }).withMessage("Email is required")
            .isString().withMessage("Email should be string")
            .isLength({ min: 2 }).withMessage("Email should be 5 characters"),
        body("password")
            .exists({ checkFalsy: true }).withMessage("Password is required")
            .isString().withMessage("Password should be string"),
    ];
}
const detailEmailListValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showEmailListValidation = () => {
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
const deleteEmailListValidation = () => {
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
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createEmailListValidation,
    updateEmailListValidation,
    showEmailListValidation,
    detailEmailListValidation,
    deleteEmailListValidation,
    deleteEmailListValidation,
    validate
}
