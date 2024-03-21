const { Vendor, Asset } = require("../models");
const { Op } = require("sequelize");
const excludeData = ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt'];
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Vendor";
class VendorController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Vendor.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await Vendor.findAll({
            where: {
                isDeleted: false,
                isActive: true,
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            attributes: {
                exclude: excludeData
            },
            // include: [
            //     {
            //         model: Asset,
            //         attributes: {
            //             exclude: excludeData
            //         }
            //     }
            // ],
            offset: offset,
            limit: limit,
            order: [
                ['name', 'ASC']
            ]
        });
        let next = cekPagination(page, totalPage).next;
        let prev = cekPagination(page, totalPage).prev;
        responsePagination(200, result, page, limit, totalRows, totalPage, prev, next, "Get data " + title + " success", res);
    }
    static showAll = async (req, res) => {
        const result = await Vendor.findAll({
            attributes: {
                exclude: excludeData
            },
            // include: [
            //     {
            //         model: Asset,
            //         attributes: {
            //             exclude: excludeData
            //         }
            //     }
            // ],
            order: [
                ['name', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await Vendor.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userName = req.userData.name
        const {
            name,
            phone,
            email,
            address,
            website,
            onlineShop,
            picName,
            picPhone,
            picEmail } = req.body;
        const result = await Vendor.create({
            name: name,
            phone: phone,
            email: email,
            address: address,
            website: website,
            onlineShop: onlineShop,
            picName: picName,
            picPhone: picPhone,
            picEmail: picEmail,
            isActive: true,
            isDeleted: false,
            createdBy: userName,
            modifiedBy: userName
        });
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const {
            name,
            phone,
            email,
            address,
            website,
            onlineShop,
            picName,
            picPhone,
            picEmail } = req.body;
        const vendor = await Vendor.findByPk(id);
        if (!vendor) {
            response(404, null, "" + title + " not found", res);
        }
        await Vendor.update(
            {
                name: name,
                phone: phone,
                email: email,
                address: address,
                website: website,
                onlineShop: onlineShop,
                picName: picName,
                picPhone: picPhone,
                picEmail: picEmail,
                modifiedBy: userName
            },
            { where: { id: id } }
        );

        const result = await Vendor.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const vendor = await Vendor.findByPk(id);
        if (!vendor) {
            response(404, null, "" + title + " not found", res);
        }
        await Vendor.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = VendorController