const { body, param, query, validationResult } = require("express-validator");

const createAssetUserValidation = () => {
    return [
        body("assetId")
            .exists({ checkFalsy: true }).withMessage("Asset Id is required")
            .isInt().withMessage("Asset Id should be integer"),
        body("nik")
            .optional(true)
            .isString().withMessage("Nik should be string"),
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("departmentId")
            .exists({ checkFalsy: true }).withMessage("Department Id is required")
            .isInt().withMessage("Department Id should be integer"),
    ];
}
const updateAssetUserValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("assetId")
            .exists({ checkFalsy: true }).withMessage("Asset Id is required")
            .isInt().withMessage("Asset Id should be integer"),
        body("nik")
            .optional(true)
            .isString().withMessage("Nik should be string"),
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("departmentId")
            .exists({ checkFalsy: true }).withMessage("Department Id is required")
            .isInt().withMessage("Department Id should be integer"),
    ];
}
const detailAssetUserValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showAssetUserValidation = () => {
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
const deleteAssetUserValidation = () => {
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
    createAssetUserValidation,
    updateAssetUserValidation,
    showAssetUserValidation,
    detailAssetUserValidation,
    deleteAssetUserValidation,
    deleteAssetUserValidation,
    validate
}