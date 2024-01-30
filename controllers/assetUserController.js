const { AssetUser } = require("../models");
const { Op } = require("sequelize");
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Asset User";
class AssetUserController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await AssetUser.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await AssetUser.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
            },
            offset: offset,
            limit: limit,
            order: [
                ['id', 'ASC']
            ]
        });
        let next = cekPagination(page, totalPage).next;
        let prev = cekPagination(page, totalPage).prev;
        responsePagination(200, result, page, limit, totalRows, totalPage, prev, next, "Get data  " + title + " success", res);
    }
    static showAll = async (req, res) => {
        const result = await AssetUser.findAll({
            order: [
                ['id', 'ASC']
            ],
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
            }
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await AssetUser.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userName = req.userData.name
        const { assetId, nik, name, departmentId } = req.body;
        const result = await AssetUser.create({
            assetId: assetId,
            nik: nik,
            name: name,
            departmentId: departmentId,
            createdBy: userName,
            modifiedBy: userName
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const { assetId, nik, name, departmentId } = req.body;
        const remoteaccess = await AssetUser.findByPk(id);
        if (!remoteaccess) {
            response(404, null, "" + title + " not found", res);
        }
        await AssetUser.update(
            {
                assetId: assetId,
                nik: nik,
                name: name,
                departmentId: departmentId,
                modifiedBy: userName,
            },
            { where: { id: id } }
        );
        const result = await AssetUser.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const AssetUser = await AssetUser.findByPk(id);
        if (!AssetUser) {
            response(404, null, "" + title + " not found", res);
        }
        await AssetUser.update(
            {
                isDeleted: true,
                isActive: false,
                deletedBy: userId,
                deletedAt: new Date(),
                modifiedBy: userName
            },
            { where: { id: id } }
        );
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = AssetUserController