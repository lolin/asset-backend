function buildJSONResponse(status, message, data) {
    return {
        status: status,
        message: message,
        data: data
    };
}
function jsonWrapper(req, res, next) {
    res.jsonWrapper = function (status, message, data) {
        const jsonResponse = buildJSONResponse(status, message, data);
        res.json(jsonResponse);
    };

    // Melanjutkan ke middleware berikutnya atau rute
    next();
}

module.exports = { jsonWrapper, buildJSONResponse };