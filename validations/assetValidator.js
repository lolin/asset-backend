const { body, param, query, validationResult } = require("express-validator");

const createAssetValidation = () => {
    return [
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string")
            .isLength({ min: 2 }).withMessage("Name should be at least 2 characters long"),
        body("departmentId")
            .exists({ checkFalsy: true }).withMessage("Department is required")
            .isInt().withMessage("Department should be integer"),
        body("assetModelId")
            .exists({ checkFalsy: true }).withMessage("Model is required")
            .isInt().withMessage("Model should be integer"),
        body("serialNumber")
            .optional()
            .isString().withMessage("Serial number should be integer")
            .isLength({ min: 5 }).withMessage("Serial number should be at least 5 characters long"),
        body("vendorId")
            .optional()
            .isInt().withMessage("Vendor should be integer"),
        body("assetStatusId")
            .exists({ checkFalsy: true }).withMessage("Asset Status is required")
            .isInt().withMessage("Asset Status should be integer"),
        body("macAddress")
            .optional()
            .isString().withMessage("Mac address should be string")
            .isLength({ min: 5 }).withMessage("Mac address should be at least 5 characters long"),
        body("assetDetails")
            .exists({ checkFalsy: true }).withMessage("Asset details is required")
            .isString().withMessage("Asset details should be string")
            .isLength({ min: 5 }).withMessage("Asset details should be at least 5 characters long"),
        body("price")
            .optional(),
        body("purchaseDate")
            .optional(),
        body("warrantyPeriod")
            .optional(),
    ];
}
const updateAssetValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string")
            .isLength({ min: 2 }).withMessage("Name should be at least 2 characters long"),
        body("departmentId")
            .exists({ checkFalsy: true }).withMessage("Department is required")
            .isInt().withMessage("Department should be integer"),
        body("assetModelId")
            .exists({ checkFalsy: true }).withMessage("Model is required")
            .isInt().withMessage("Model should be integer"),
        body("serialNumber")
            .optional()
            .isString().withMessage("Serial number should be integer")
            .isLength({ min: 5 }).withMessage("Serial number should be at least 5 characters long"),
        body("vendorId")
            .optional()
            .isInt().withMessage("Vendor should be integer"),
        body("assetStatusId")
            .exists({ checkFalsy: true }).withMessage("Asset Status is required")
            .isInt().withMessage("Asset Status should be integer"),
        body("macAddress")
            .optional()
            .isString().withMessage("Mac address should be string")
            .isLength({ min: 5 }).withMessage("Mac address should be at least 5 characters long"),
        body("assetDetails")
            .exists({ checkFalsy: true }).withMessage("Asset details is required")
            .isString().withMessage("Asset details should be string")
            .isLength({ min: 5 }).withMessage("Asset details should be at least 5 characters long"),
        body("price")
            .optional(),
        body("purchaseDate")
            .optional(),
        body("warrantyPeriod")
            .optional(),
    ];
}
const detailAssetValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showAssetValidation = () => {
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
const deleteAssetValidation = () => {
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
    // console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    createAssetValidation,
    updateAssetValidation,
    showAssetValidation,
    detailAssetValidation,
    deleteAssetValidation,
    deleteAssetValidation,
    validate
}