const { CustomField, FieldSet, AssetModel } = require("../models");
const { Op, where } = require("sequelize");
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Custom Field";
class CustomFieldController {
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await CustomField.count({
            where: {
                [Op.or]: [{
                    fieldName: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await CustomField.findAll({
            where: {
                [Op.or]: [{
                    fieldName: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            include: [
                {
                    model: FieldSet,
                    attributes: {
                        exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
                    }
                }
            ],
            offset: offset,
            limit: limit,
            order: [
                ['fieldName', 'ASC']
            ]
        });
        let next = cekPagination(page, totalPage).next;
        let prev = cekPagination(page, totalPage).prev;
        responsePagination(200, result, page, limit, totalRows, totalPage, prev, next, "Get data " + title + " success", res);
    }
    static showAll = async (req, res) => {
        const result = await CustomField.findAll({
            include: [
                {
                    model: FieldSet,
                    attributes: {
                        exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
                    }
                }
            ],
            order: [
                ['fieldName', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await CustomField.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userName = req.userData.name
        const {
            fieldSetId,
            fieldName,
            fieldType,
            fieldValue,
            fieldFormat,
            helperText,
            orderNumber } = req.body;
        console.log("Heloo", req.body)
        const result = await CustomField.create(
            {
                fieldSetId: fieldSetId,
                fieldName: fieldName,
                fieldType: fieldType,
                fieldValue: fieldValue,
                fieldFormat: fieldFormat,
                helperText: helperText,
                orderNumber: orderNumber,
                createdBy: userName,
                modifiedBy: userName
            }
        );
        response(201, result, "Create " + title + " success", res);
    }
    static update = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const {
            fieldSetId,
            fieldName,
            fieldType,
            fieldValue,
            fieldFormat,
            helperText,
            orderNumber
        } = req.body;
        const datas = await CustomField.findByPk(id);
        if (!datas) {
            response(404, null, "" + title + " not found", res);
        }
        await CustomField.update({
            fieldSetId: fieldSetId,
            fieldName: fieldName,
            fieldType: fieldType,
            fieldValue: fieldValue,
            fieldFormat: fieldFormat,
            orderNumber: orderNumber,
            helperText: helperText,
            modifiedBy: userName
        },
            { where: { id: id } }
        );
        const result = await CustomField.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const result = await CustomField.findByPk(id);
        if (!result) {
            response(404, null, "" + title + " not found", res);
        }
        await CustomField.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
    static getByModel = async (req, res) => {
        const result = await CustomField.findAll({
            include: [
                {
                    model: FieldSet,
                    attributes: {
                        exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt'],
                    },
                    include: [
                        {
                            model: AssetModel,
                            attributes: {
                                exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt'],
                                where: {
                                    id: req.params.id
                                }
                            },
                        }
                    ]
                }
            ],
            order: [
                ['orderNumber', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
}
module.exports = CustomFieldController