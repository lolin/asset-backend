const { AssetAccount } = require("../models");
const { Op } = require("sequelize");
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Asset Account";
class AssetAccountController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await AssetAccount.count({
            where: {
                [Op.or]: [{
                    accountName: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await AssetAccount.findAll({
            where: {
                [Op.or]: [{
                    accountName: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
            ,
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
        responsePagination(200, result, page, limit, totalRows, totalPage, prev, next, "Get data " + title + " success", res);
    }
    static showAll = async (req, res) => {
        const result = await AssetAccount.findAll({
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
        const result = await AssetAccount.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userId = req.userData.id
        const { assetId, accountName, password } = req.body;
        const result = await AssetAccount.create({
            assetId: assetId,
            accountName: accountName,
            password: password,
            createdBy: userId,
            modifiedBy: userId
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const { assetId, accountName, password } = req.body;
        const remoteaccess = await AssetAccount.findByPk(id);
        if (!remoteaccess) {
            return res.status(404).json({
                message: "" + title + " not found"
            })
        }
        await AssetAccount.update(
            {
                assetId: assetId,
                accountName: accountName,
                password: password,
                modifiedBy: userId,
            },
            { where: { id: id } }
        );
        const result = await AssetAccount.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        const AssetAccount = await AssetAccount.findByPk(id);
        if (!AssetAccount) {
            response(404, null, "" + title + " not found", res);
        }
        await AssetAccount.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = AssetAccountController