const { body, param, query, validationResult } = require("express-validator");

const createAssetValidation = () => {
    return [
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string")
            .isLength({ min: 2 }).withMessage("Name should be at least 2 characters long"),
        body("categoryId")
            .exists({ checkFalsy: true }).withMessage("Category is required")
            .isInt().withMessage("Category should be integer"),
        body("departmentId")
            .exists({ checkFalsy: true }).withMessage("Department is required")
            .isInt().withMessage("Department should be integer"),
        body("manufacturerId")
            .exists({ checkFalsy: true }).withMessage("Manufacturer is required")
            .isInt().withMessage("Manufacturer should be integer"),
        body("vendorId")
            .optional()
            .isInt().withMessage("Vendor should be integer"),
        body("conditionId")
            .exists({ checkFalsy: true }).withMessage("Condition is required")
            .isInt().withMessage("Condition should be integer"),
        body("model")
            .optional()
            .isString().withMessage("Model should be string")
            .isLength({ min: 5 }).withMessage("Model should be at least 5 characters long"),
        body("serialNumber")
            .optional()
            .isString().withMessage("Serial number should be string")
            .isLength({ min: 5 }).withMessage("Serial number should be at least 5 characters long"),
        body("macAddress")
            .optional()
            .isString().withMessage("Mac address should be string")
            .isLength({ min: 5 }).withMessage("Mac address should be at least 5 characters long"),
        body("ipAddress")
            .optional()
            .isString().withMessage("Ip address should be string")
            .isLength({ min: 5 }).withMessage("Ip address should be at least 5 characters long"),
        body("assetDetails")
            .exists({ checkFalsy: true }).withMessage("Asset details is required")
            .isString().withMessage("Asset details should be string")
            .isLength({ min: 5 }).withMessage("Asset details should be at least 5 characters long"),
        body("price")
            .optional()
            .isNumeric().withMessage("Price should be number")
            .isLength({ min: 1 }).withMessage("Price should be at least 1 characters long"),
        body("purchaseDate")
            .optional()
            .isDate().withMessage("Purchase date should be date"),
        body("warrantyPeriod")
            .optional()
            .isDate().withMessage("Warranty period should be date"),
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
        body("categoryId")
            .exists({ checkFalsy: true }).withMessage("Category is required")
            .isInt().withMessage("Category should be integer"),
        body("departmentId")
            .exists({ checkFalsy: true }).withMessage("Department is required")
            .isInt().withMessage("Department should be integer"),
        body("manufacturerId")
            .exists({ checkFalsy: true }).withMessage("Manufacturer is required")
            .isInt().withMessage("Manufacturer should be integer"),
        body("vendorId")
            .optional()
            .isInt().withMessage("Vendor should be integer"),
        body("conditionId")
            .exists({ checkFalsy: true }).withMessage("Condition is required")
            .isInt().withMessage("Condition should be integer"),
        body("model")
            .optional()
            .isString().withMessage("Model should be string")
            .isLength({ min: 5 }).withMessage("Model should be at least 5 characters long"),
        body("serialNumber")
            .optional()
            .isString().withMessage("Serial number should be string")
            .isLength({ min: 5 }).withMessage("Serial number should be at least 5 characters long"),
        body("macAddress")
            .optional()
            .isString().withMessage("Mac address should be string")
            .isLength({ min: 5 }).withMessage("Mac address should be at least 5 characters long"),
        body("ipAddress")
            .optional()
            .isString().withMessage("Ip address should be string")
            .isLength({ min: 5 }).withMessage("Ip address should be at least 5 characters long"),
        body("assetDetails")
            .exists({ checkFalsy: true }).withMessage("Asset details is required")
            .isString().withMessage("Asset details should be string")
            .isLength({ min: 5 }).withMessage("Asset details should be at least 5 characters long"),
        body("price")
            .optional()
            .isNumeric().withMessage("Price should be number")
            .isLength({ min: 1 }).withMessage("Price should be at least 1 characters long"),
        body("purchaseDate")
            .optional()
            .isDate().withMessage("Purchase date should be date"),
        body("warrantyPeriod")
            .optional()
            .isDate().withMessage("Warranty period should be date"),
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