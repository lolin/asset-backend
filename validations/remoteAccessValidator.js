const { body, param, query, validationResult } = require("express-validator");

const createRemoteAccessValidation = () => {
    return [
        body("assetId")
            .exists({ checkFalsy: true }).withMessage("Asset Id is required")
            .isInt().withMessage("Asset Id should be integer"),
        body("remoteType")
            .exists({ checkFalsy: true }).withMessage("Remote Type is required")
            .isString().withMessage("Remote Type should be string")
            .isLength({ min: 5 }).withMessage("Remote Type should be 5 characters"),
        body("remoteId")
            .exists({ checkFalsy: true }).withMessage("Remote Id is required")
            .isString().withMessage("Remote Id should be string")
            .isLength({ min: 5 }).withMessage("Remote Id should be 5 characters"),
        body("password")
            .exists({ checkFalsy: true }).withMessage("Password is required")
            .isString().withMessage("Password should be string")

    ];
}
const updateRemoteAccessValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("assetId")
            .exists({ checkFalsy: true }).withMessage("Asset Id is required")
            .isInt().withMessage("Asset Id should be integer"),
        body("remoteType")
            .exists({ checkFalsy: true }).withMessage("Remote Type is required")
            .isString().withMessage("Remote Type should be string")
            .isLength({ min: 5 }).withMessage("Remote Type should be 5 characters"),
        body("remoteId")
            .exists({ checkFalsy: true }).withMessage("Remote Id is required")
            .isString().withMessage("Remote Id should be string")
            .isLength({ min: 5 }).withMessage("Remote Id should be 5 characters"),
        body("password")
            .exists({ checkFalsy: true }).withMessage("Password is required")
            .isString().withMessage("Password should be string")
    ];
}
const detailRemoteAccessValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showRemoteAccessValidation = () => {
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
const deleteRemoteAccessValidation = () => {
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
    createRemoteAccessValidation,
    updateRemoteAccessValidation,
    showRemoteAccessValidation,
    detailRemoteAccessValidation,
    deleteRemoteAccessValidation,
    deleteRemoteAccessValidation,
    validate
}
