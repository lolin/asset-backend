const jwt = require('jsonwebtoken');
const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;
    // console.log(authorization)
    if (!authorization) {
        return res.status(401).json({
            message: "Unauthorized | Token not found"
        })
    }
    const token = authorization.split(' ')[1];
    const secret = process.env.SECRET_KEY

    try {
        const jwtDecode = jwt.verify(token, secret);
        // console.log(jwtDecode)
        req.userData = jwtDecode;
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized" + error
        })
    }
    next();
}

module.exports = accessValidation