const { body, param, query, validationResult } = require("express-validator");

const createManufacturerValidation = () => {
    return [
        body("name")
            .exists({ checkFalsy: true })
            .withMessage("Name is required")
            .isString()
            .withMessage("Name should be string")
            .isLength({ min: 3 })
            .withMessage("Name should be at least 3 characters long"),
    ];
}
const updateManufacturerValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
        body("name")
            .exists({ checkFalsy: true })
            .withMessage("Name is required")
            .isString()
            .withMessage("Name should be string"),
    ];
}
const detailManufacturerValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showManufacturerValidation = () => {
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
const deleteManufacturerValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("ID is required"),
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
    createManufacturerValidation,
    updateManufacturerValidation,
    showManufacturerValidation,
    detailManufacturerValidation,
    deleteManufacturerValidation,
    deleteManufacturerValidation,
    validate
}