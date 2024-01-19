const { body, param, query, validationResult } = require("express-validator");

const createAssetModelValidation = () => {
    return [
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("imageUrl")
            .optional(true)
            .isString().withMessage("Image Url should be string"),
        body("modelNumber")
            .exists({ checkFalsy: true })
            .withMessage("Model Number is required"),
        body("manufacturerId")
            .exists({ checkFalsy: true })
            .withMessage("Manufacturer Id is required")
            .isInt().withMessage("Manufacturer Id must be an integer"),
        body("categoryId")
            .exists({ checkFalsy: true }).withMessage("Category Id is required")
            .isInt().withMessage("Category Id must be an integer"),
        body("fieldSetId")
            .exists({ checkFalsy: true }).withMessage("Field Set Id is required")
            .isInt().withMessage("Field Set Id must be an integer"),
        body("depreciationId")
            .optional(true)
            .isInt().withMessage("Depreciation Id must be an integer"),
        body("eol")
            .optional(true)
            .isInt().withMessage("Eol should be integer"),
        body("notes")
            .optional(true)
            .isString().withMessage("Notes should be string"),
    ];
}
const updateAssetModelValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("imageUrl")
            .optional(true)
            .isString().withMessage("Image Url should be string"),
        body("modelNumber")
            .exists({ checkFalsy: true })
            .withMessage("Model Number is required"),
        body("manufacturerId")
            .exists({ checkFalsy: true })
            .withMessage("Manufacturer Id is required")
            .isInt().withMessage("Manufacturer Id must be an integer"),
        body("categoryId")
            .exists({ checkFalsy: true }).withMessage("Category Id is required")
            .isInt().withMessage("Category Id must be an integer"),
        body("fieldSetId")
            .exists({ checkFalsy: true }).withMessage("Field Set Id is required")
            .isInt().withMessage("Field Set Id must be an integer"),
        body("depreciationId")
            .optional(true)
            .isInt().withMessage("Depreciation Id must be an integer"),
        body("eol")
            .optional(true)
            .isInt().withMessage("Eol should be integer"),
        body("notes")
            .optional(true)
            .isString().withMessage("Notes should be string"),
    ];
}
const detailAssetModelValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showAssetModelValidation = () => {
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
const deleteAssetModelValidation = () => {
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
    createAssetModelValidation,
    updateAssetModelValidation,
    showAssetModelValidation,
    detailAssetModelValidation,
    deleteAssetModelValidation,
    deleteAssetModelValidation,
    validate
}