const { AssetModel, Manufacturer, Category, FieldSet, Depreciation } = require("../models");
const { Op } = require("sequelize");
class AssetModelController {
    static showAll = async (req, res) => {
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
                        exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: Category,
                    attributes: {
                        exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: FieldSet,
                    attributes: {
                        exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: Depreciation,
                    attributes: {
                        exclude: ['createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
                    }
                }
            ],
            offset: offset,
            limit: limit,
            order: [
                ['name', 'ASC']
            ]
        });
        res.json({
            message: "Get data AssetModels success",
            data: result,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        });
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        try {
            const data = await AssetModel.findByPk(id);
            res.json({
                message: "Get data AssetModels success",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static store = async (req, res) => {
        const userId = req.userData.id
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
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        if (!categoryId) {
            return res.status(400).json({
                message: "Category is required"
            })
        }
        if (!depreciationId) {
            return res.status(400).json({
                message: "Depreciation is required"
            })
        }
        try {
            console.log(req.body)
            const newAssetModel = await AssetModel.create({
                name: name,
                imageUrl: imageUrl,
                modelNumber: modelNumber,
                manufacturerId: manufacturerId,
                categoryId: categoryId,
                fieldSetId: fieldSetId,
                depreciationId: depreciationId,
                eol: eol,
                notes: notes,
                createdBy: userId,
                modifiedBy: userId
            });
            console.log(newAssetModel)
            res.status(201).json({
                message: "Create AssetModel success",
                data: newAssetModel
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static update = async (req, res) => {
        const userId = req.userData.id
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
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        if (!categoryId) {
            return res.status(400).json({
                message: "Category is required"
            })
        }
        if (!depreciationId) {
            return res.status(400).json({
                message: "Depreciation is required"
            })
        }
        const result = await AssetModel.findByPk(id);
        if (!result) {
            return res.status(404).json({
                message: "AssetModel not found"
            })
        }
        try {
            const result = await AssetModel.update(
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
                    modifiedBy: userId,
                },
                { where: { id: id } }
            );

            const AssetModelUpdate = await AssetModel.findByPk(id);
            res.json({
                message: "Update Asset Model success",
                data: AssetModelUpdate
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static destroy = async (req, res) => {
        const userId = req.userData.id
        const { id } = req.params;
        // const { reason } = req.body;
        const result = await AssetModel.findByPk(id);
        if (!result) {
            return res.status(404).json({
                message: "Asset Model not found"
            })
        }
        // console.log(AssetModel)
        try {
            // hapus langsung
            await AssetModel.destroy({
                where: {
                    id: id
                }
            });
            // await AssetModel.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: userId,
            //         deletedAt: new Date(),
            //         modifiedBy: userId
            //     },
            //     { where: { id: id } }
            // );
            res.json({
                message: "Delete Asset Model success",
                data: null
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }

    }
}
module.exports = AssetModelController