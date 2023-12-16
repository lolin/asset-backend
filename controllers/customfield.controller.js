const { CustomField, FieldSet, AssetModel } = require("../models");
const { Op, where } = require("sequelize");
class CustomFieldController {
    static showAll = async (req, res) => {
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
        const userId = req.userData.id
        const {
            fieldSetId,
            fieldName,
            fieldType,
            fieldValue,
            fieldFormat,
            helperText } = req.body;
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

        try {
            const result = await CustomField.create(
                {
                    fieldSetId: fieldSetId,
                    fieldName: fieldName,
                    fieldType: fieldType,
                    fieldValue: fieldValue,
                    fieldFormat: fieldFormat,
                    helperText: helperText,
                    createdBy: userId,
                    modifiedBy: userId
                }
            );
            res.status(201).json({
                message: "Create CustomField success",
                data: result
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
            fieldSetId,
            fieldName,
            fieldType,
            fieldValue,
            fieldFormat,
            helperText
        } = req.body;
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
        const datas = await CustomField.findByPk(id);
        if (!datas) {
            return res.status(404).json({
                message: "CustomField not found"
            })
        }
        try {
            await CustomField.update({
                fieldSetId: fieldSetId,
                fieldName: fieldName,
                fieldType: fieldType,
                fieldValue: fieldValue,
                fieldFormat: fieldFormat,
                helperText: helperText,
                modifiedBy: userId
            },
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
        const userId = req.userData.id
        const { id } = req.params;
        const result = await CustomField.findByPk(id);
        if (!result) {
            return res.status(404).json({
                message: "CustomField not found"
            })
        }
        try {
            // await CustomField.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: userId,
            //         deletedAt: new Date(),
            //         modifiedBy: userId
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

    static getByModel = async (req, res) => {
        console.log("iniiiiiiii: ", req.params.id)
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
                ['fieldName', 'ASC']
            ]
        });
        res.json({
            message: "Get data Custom Field  success",
            data: result,
        });

    }
}
module.exports = CustomFieldController