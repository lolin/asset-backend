const { body, param, query, validationResult } = require("express-validator");

const createCustomFieldValidation = () => {
    return [
        body("fieldSetId")
            .exists({ checkFalsy: true }).withMessage("Field Set is required")
            .isInt().withMessage("Field Set should be integer"),
        body("fieldName")
            .exists({ checkFalsy: true }).withMessage("Field Name is required")
            .isString().withMessage("Field Name should be string"),
        body("fieldType")
            .optional(true)
            .isString().withMessage("Field Type should be string"),
        body("fieldValue")
            .optional(true)
            .isString().withMessage("Field Value should be string"),
        body("fieldFormat")
            .optional(true)
            .isString().withMessage("Field Format should be string"),
        body("helperText")
            .optional(true)
            .isString().withMessage("Helper Text should be string"),
        body("orderNumber")
            .optional(true)
            .isInt().withMessage("Order Number should be number"),
    ];
}
const updateCustomFieldValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("fieldSetId")
            .exists({ checkFalsy: true }).withMessage("Field Set is required")
            .isInt().withMessage("Field Set should be integer"),
        body("fieldName")
            .exists({ checkFalsy: true }).withMessage("Field Name is required")
            .isString().withMessage("Field Name should be string"),
        body("fieldType")
            .optional(true)
            .isString().withMessage("Field Type should be string"),
        body("fieldValue")
            .optional(true)
            .isString().withMessage("Field Value should be string"),
        body("fieldFormat")
            .optional(true)
            .isString().withMessage("Field Format should be string"),
        body("helperText")
            .optional(true)
            .isString().withMessage("Helper Text should be string"),
        body("orderNumber")
            .optional(true)
            .isInt().withMessage("Order Number should be number"),
    ];
}
const detailCustomFieldValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showCustomFieldValidation = () => {
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
const deleteCustomFieldValidation = () => {
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
    createCustomFieldValidation,
    updateCustomFieldValidation,
    showCustomFieldValidation,
    detailCustomFieldValidation,
    deleteCustomFieldValidation,
    deleteCustomFieldValidation,
    validate
}