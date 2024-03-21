const { EmailList, Department } = require("../models");
const { Op } = require("sequelize");
const excludeData = ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt'];
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "EmailList";
class EmailListController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await EmailList.count({
            where: {
                [Op.or]: [{
                    email: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await EmailList.findAll({
            where: {
                [Op.or]: [{
                    email: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            attributes: {
                exclude: excludeData
            },
            include: [
                {
                    model: Department,
                    attributes: {
                        exclude: excludeData
                    }
                }
            ],
            offset: offset,
            limit: limit,
            order: [
                ['email', 'ASC']
            ]
        });
        let next = cekPagination(page, totalPage).next;
        let prev = cekPagination(page, totalPage).prev;
        responsePagination(200, result, page, limit, totalRows, totalPage, prev, next, "Get data " + title + " success", res);
    }
    static showAll = async (req, res) => {
        const result = await EmailList.findAll({
            attributes: {
                exclude: excludeData
            },
            include: [
                {
                    model: Department,
                    attributes: {
                        exclude: excludeData
                    }
                }
            ],
            order: [
                ['email', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await EmailList.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const nameUser = req.userData.employeeName
        const { employeeName, departmentId, remoteId, email, password, } = req.body;
        const result = await EmailList.create({
            departmentId: departmentId || null,
            employeeName: employeeName,
            email: email,
            password: password,
            createdBy: nameUser,
            modifiedBy: nameUser
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const nameUser = req.userData.employeeName
        const { id } = req.params;
        const { employeeName, departmentId, remoteId, email, password, } = req.body;
        const data = await EmailList.findByPk(id);
        if (!data) {
            response(404, null, "" + title + " not found", res);
        }
        await EmailList.update(
            {
                employeeName: employeeName,
                departmentId: departmentId || null,
                remoteId: remoteId,
                email: email,
                password: password,
                modifiedBy: nameUser,
            },
            { where: { id: id } }
        );
        const result = await EmailList.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const nameUser = req.userData.employeeName
        const { id } = req.params;
        const data = await EmailList.findByPk(id);
        if (!data) {
            response(404, null, "" + title + " not found", res);
        }
        await EmailList.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = EmailListController