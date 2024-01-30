const logRequest = (req, res, next) => {
    console.log("Ada request ke: " + req.path);
    next();
}
module.exports = logRequest