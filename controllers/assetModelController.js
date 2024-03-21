const { AssetModel, Manufacturer, Category, FieldSet, Depreciation } = require("../models");
const { Op } = require("sequelize");
const excludeData = ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt'];
const { response, responsePagination } = require('../utility/response');
const cekPagination = require('../utility/cekPagination');
const title = "Asset Model";
class AssetModelController {
    static showAll = async (req, res) => {
        const result = await AssetModel.findAll({
            include: [
                {
                    model: Manufacturer,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Category,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: FieldSet,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Depreciation,
                    attributes: {
                        exclude: excludeData
                    }
                }
            ],
            order: [
                ['name', 'ASC']
            ]
        });
        response(200, result, "Get data " + title + " success", res);
    }
    static show = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await AssetModel.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await AssetModel.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            include: [
                {
                    model: Manufacturer,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Category,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: FieldSet,
                    attributes: {
                        exclude: excludeData
                    }
                },
                {
                    model: Depreciation,
                    attributes: {
                        exclude: excludeData
                    }
                }
            ],
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
    static getDataById = async (req, res) => {
        const { id } = req.params
        const result = await AssetModel.findByPk(id);
        response(200, result, "Get data " + title + " success", res);
    }
    static store = async (req, res) => {
        const userName = req.userData.name
        const {
            name,
            imageUrl,
            modelNumber,
            manufacturerId,
            categoryId,
            fieldSetId,
            depreciationId,
            eol,
            notes } = req.body;
        const result = await AssetModel.create({
            name: name,
            imageUrl: imageUrl,
            modelNumber: modelNumber,
            manufacturerId: manufacturerId,
            categoryId: categoryId,
            fieldSetId: fieldSetId,
            depreciationId: depreciationId,
            eol: eol,
            notes: notes,
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
            imageUrl,
            modelNumber,
            manufacturerId,
            categoryId,
            fieldSetId,
            depreciationId,
            eol,
            notes } = req.body;
        const data = await AssetModel.findByPk(id);
        if (!data) {
            response(404, null, "" + title + " not found", res);
        }
        await AssetModel.update(
            {
                name: name,
                imageUrl: imageUrl,
                modelNumber: modelNumber,
                manufacturerId: manufacturerId,
                categoryId: categoryId,
                fieldSetId: fieldSetId,
                depreciationId: depreciationId,
                eol: eol,
                notes: notes,
                modifiedBy: userName,
            },
            { where: { id: id } }
        );
        const result = await AssetModel.findByPk(id);
        response(200, result, "Update " + title + " success", res);
    }
    static destroy = async (req, res) => {
        const userName = req.userData.name
        const { id } = req.params;
        const result = await AssetModel.findByPk(id);
        if (!result) {
            response(404, null, "" + title + " not found", res);
        }
        await AssetModel.destroy({
            where: {
                id: id
            }
        });
        response(204, null, "Delete " + title + " success", res);
    }
}
module.exports = AssetModelController