const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            message: message,
            data: data
        },
    });
}
const responseSimple = (statusCode, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            message: message,
        },
    });
}
const responsePagination = (statusCode, data, page, limit, totalRow, totalPage, prev, next, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            message: message,
            data: data
        },
        pagination: {
            total_rows: totalRow,
            total_page: totalPage,
            limit: limit,
            page: page,
            next: next,
            prev: prev
        }
    });
}

module.exports = { response, responseSimple, responsePagination }