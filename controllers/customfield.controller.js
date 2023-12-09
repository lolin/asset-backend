const { CustomField } = require("../models");
const { Op } = require("sequelize");
class CustomFieldController {
    static showAll = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await CustomField.count({
            where: {
                [Op.or]: [{
                    name: {
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
            offset: offset,
            limit: limit,
            order: [
                ['fieldName', 'ASC']
            ]
        });
        res.json({
            message: "Get data Custom Field  success",
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
            const data = await CustomField.findByPk(id);
            res.json({
                message: "Get data custom field success",
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
        const { fieldSetId, fieldName, fieldType, fieldValue, fieldFormat, helperText } = req.body;
        if (!fieldSetId) {
            return res.status(400).json({
                message: "Field Set is required"
            })
        }
        if (!fieldName) {
            return res.status(400).json({
                message: "Field Nsme is required"
            })
        }
        if (!fieldType) {
            return res.status(400).json({
                message: "Field Type is required"
            })
        }
        if (!fieldFormat) {
            return res.status(400).json({
                message: "Field Format is required"
            })
        }
        try {
            const newCustomField = await CustomField.create(
                {
                    fieldSetId: fieldSetId,
                    fieldName: fieldName,
                    fieldType: fieldType,
                    fieldValue: fieldValue,
                    fieldFormat: fieldFormat,
                    helperText: helperText,
                    createdBy: 1,
                    modifiedBy: 1
                }
            );
            res.status(201).json({
                message: "Create CustomField success",
                data: newCustomField
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static update = async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        const CustomField = await CustomField.findByPk(id);
        if (!CustomField) {
            return res.status(404).json({
                message: "CustomField not found"
            })
        }
        try {
            await CustomField.update({ name: name, modifiedBy: 1 },
                { where: { id: id } }
            );

            const CustomFieldUpdate = await CustomField.findByPk(id);
            res.json({
                message: "Update CustomField success",
                data: CustomFieldUpdate
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static destroy = async (req, res) => {
        const { id } = req.params;
        const CustomField = await CustomField.findByPk(id);
        if (!CustomField) {
            return res.status(404).json({
                message: "CustomField not found"
            })
        }
        try {
            // await CustomField.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: 1,
            //         deletedAt: new Date(),
            //         modifiedBy: 1
            //     },
            //     { where: { id: id } }
            // );
            await CustomField.destroy({
                where: {
                    id: id
                }
            });
            res.json({
                message: "Delete CustomField success",
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
module.exports = CustomFieldController