const cekPagination = (page, total_page) => {
    return {
        next: page < total_page ? page + 1 : null,
        prev: page > 1 ? page - 1 : null
    }
}
module.exports = cekPagination