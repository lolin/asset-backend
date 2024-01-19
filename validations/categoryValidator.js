const { body, param, query, validationResult } = require("express-validator");

const createCategoryValidation = () => {
    return [
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("assetTypeId")
            .exists({ checkFalsy: true }).withMessage("Asset Type is required")
            .isInt().withMessage("Asset Type should be integer"),
    ];
}
const updateCategoryValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("assetTypeId")
            .exists({ checkFalsy: true }).withMessage("Asset Type is required")
            .isInt().withMessage("Asset Type should be integer"),
    ];
}
const detailCategoryValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showCategoryValidation = () => {
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
const deleteCategoryValidation = () => {
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
    createCategoryValidation,
    updateCategoryValidation,
    showCategoryValidation,
    detailCategoryValidation,
    deleteCategoryValidation,
    deleteCategoryValidation,
    validate
}