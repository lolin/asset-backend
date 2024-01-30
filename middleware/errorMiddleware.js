const errorMiddleware = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(
        console.log(res)
    )
module.exports = errorMiddleware