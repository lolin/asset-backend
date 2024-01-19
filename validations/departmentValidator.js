const { body, param, query, validationResult } = require("express-validator");

const createDepartmentValidation = () => {
    return [
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("companyId")
            .exists({ checkFalsy: true }).withMessage("Company is required")
            .isInt().withMessage("Company should be integer"),

    ];
}
const updateDepartmentValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("companyId")
            .exists({ checkFalsy: true }).withMessage("Company is required")
            .isInt().withMessage("Company should be integer"),
    ];
}
const detailDepartmentValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showDepartmentValidation = () => {
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
const deleteDepartmentValidation = () => {
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
    createDepartmentValidation,
    updateDepartmentValidation,
    showDepartmentValidation,
    detailDepartmentValidation,
    deleteDepartmentValidation,
    deleteDepartmentValidation,
    validate
}