const jwt = require('jsonwebtoken');
const { secret } = require('../config/config.js')
const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            message: "Unauthorized | Token not found"
        })
    }
    const token = authorization.split(' ')[1];
    try {
        const jwtDecode = jwt.verify(token, secret);
        req.userData = jwtDecode;
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized" + error
        })
    }
    next();
}

module.exports = accessValidation