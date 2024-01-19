const { body, param, query, validationResult } = require("express-validator");

const createVendorValidation = () => {
    return [
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("phone")
            .optional(true)
            .isString().withMessage("Phone should be string"),
        body("email")
            .if(body("email").notEmpty())
            .isEmail().withMessage("Please input valid email"),
        body("address")
            .optional(true)
            .isString().withMessage("Address should be string"),
        body("website")
            .optional(true)
            .isString().withMessage("Website should be string"),
        body("onlineShop")
            .optional(true)
            .isString().withMessage("Online shop should be string"),
        body("picName")
            .optional(true)
            .isString().withMessage("Pic name should be string"),
        body("picPhone")
            .optional(true)
            .isString().withMessage("Pic phone should be string"),
        body("picEmail")
            .if(body("email").notEmpty())
            .isEmail().withMessage("Please input valid email"),
    ];
}
const updateVendorValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required"),
        body("name")
            .exists({ checkFalsy: true }).withMessage("Name is required")
            .isString().withMessage("Name should be string"),
        body("phone")
            .optional(true)
            .isString().withMessage("Phone should be string"),
        body("email")
            .if(body("email").notEmpty())
            .isEmail().withMessage("Please input valid email"),
        body("address")
            .optional(true)
            .isString().withMessage("Address should be string"),
        body("website")
            .optional(true)
            .isString().withMessage("Website should be string"),
        body("onlineShop")
            .optional(true)
            .isString().withMessage("Online shop should be string"),
        body("picName")
            .optional(true)
            .isString().withMessage("Pic name should be string"),
        body("picPhone")
            .optional(true)
            .isString().withMessage("Pic phone should be string"),
        body("picEmail")
            .if(body("email").notEmpty())
            .isEmail().withMessage("Please input valid email"),
    ];
}
const detailVendorValidation = () => {
    return [
        param("id")
            .exists({ checkFalsy: true })
            .withMessage("Id is required")
            .isInt()
            .withMessage("Id should be integer"),
    ];
}
const showVendorValidation = () => {
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
const deleteVendorValidation = () => {
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
    createVendorValidation,
    updateVendorValidation,
    showVendorValidation,
    detailVendorValidation,
    deleteVendorValidation,
    deleteVendorValidation,
    validate
}