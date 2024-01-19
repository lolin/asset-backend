const { body, param, query, validationResult } = require("express-validator");

const createAssetAccountValidation = () => {
    return [
        body("assetId")
            .exists({ checkFalsy: true }).withMessage("Asset Id is required")
            .isInt().withMessage("Asset Id must be an integer"),
        body("accountName")
            .exists({ checkFalsy: true }).withMessage("Account Name is required")
            .isString().withMessage("Account Name should be string")
            .isLength({ min: 2 }).withMessage("Account Name should be at least 2 characters long"),
        body("password")
            .exists({ checkFalsy: true })
            .withMessage("Password is required")
            .isString()
    ];
}
const updateAssetAccountValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("assetId")
            .exists({ checkFalsy: true }).withMessage("Asset Id is required")
            .isInt().withMessage("Asset Id must be an integer"),
        body("accountName")
            .exists({ checkFalsy: true }).withMessage("Account Name is required")
            .isString().withMessage("Account Name should be string")
            .isLength({ min: 2 }).withMessage("Account Name should be at least 2 characters long"),
        body("password")
            .exists({ checkFalsy: true })
            .withMessage("Password is required")
            .isString()
    ];
}
const detailAssetAccountValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showAssetAccountValidation = () => {
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
const deleteAssetAccountValidation = () => {
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
    createAssetAccountValidation,
    updateAssetAccountValidation,
    showAssetAccountValidation,
    detailAssetAccountValidation,
    deleteAssetAccountValidation,
    deleteAssetAccountValidation,
    validate
}