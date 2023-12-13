const { FieldSet } = require("../models");
const { Op } = require("sequelize");
class FieldSetController {
    static showAll = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await FieldSet.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const result = await FieldSet.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            },
            offset: offset,
            limit: limit,
            order: [
                ['name', 'ASC']
            ]
        });
        res.json({
            message: "Get data Field Set success",
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
            const data = await FieldSet.findByPk(id);
            res.json({
                message: "Get data field sset success",
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
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        try {
            const newFieldSet = await FieldSet.create(
                {
                    name: name,
                    createdBy: 1,
                    modifiedBy: 1
                }
            );
            res.status(201).json({
                message: "Create FieldSet success",
                data: newFieldSet
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
        const datas = await FieldSet.findByPk(id);
        if (!datas) {
            return res.status(404).json({
                message: "FieldSet not found"
            })
        }
        try {
            await datas.update({ name: name, modifiedBy: 1 },
                { where: { id: id } }
            );

            const FieldSetUpdate = await FieldSet.findByPk(id);
            res.json({
                message: "Update FieldSet success",
                data: FieldSetUpdate
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
        const datas = await FieldSet.findByPk(id);
        if (!datas) {
            return res.status(404).json({
                message: "FieldSet not found"
            })
        }
        try {
            // await FieldSet.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: 1,
            //         deletedAt: new Date(),
            //         modifiedBy: 1
            //     },
            //     { where: { id: id } }
            // );
            await FieldSet.destroy({
                where: {
                    id: id
                }
            });
            res.json({
                message: "Delete FieldSet success",
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
module.exports = FieldSetController