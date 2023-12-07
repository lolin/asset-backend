const { Condition } = require("../models");
const { Op } = require("sequelize");
class ConditionController {
    static showAll = async (req, res) => {
        const keyword = req.query.key || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = limit * (page - 1);
        const totalRows = await Condition.count({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.iLike]: '%' + keyword + '%'
                    }
                }]
            }
        });
        const totalPage = Math.ceil(totalRows / limit);
        const data = await Condition.findAll({
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
                ['name', 'ASC']
            ]
        });
        res.json({
            message: "Get data Conditions success",
            data: data,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
        })

    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        try {
            const data = await Condition.findByPk(id);
            res.json({
                message: "Get data Conditions success",
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
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        if (!description) {
            return res.status(400).json({
                message: "Description is required"
            })
        }
        try {
            const newCondition = await Condition.create({
                name: name,
                description: description,
                createdBy: 1,
                modifiedBy: 1
            });
            res.status(201).json({
                message: "Create condition success",
                data: newCondition
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
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        if (!description) {
            return res.status(400).json({
                message: "Description is required"
            })
        }
        const condition = await Condition.findByPk(id);
        if (!condition) {
            return res.status(404).json({
                message: "Condition not found"
            })
        }
        try {
            const updateCondition = await Condition.update(
                {
                    name: name,
                    description: description,
                    modifiedBy: 1,
                },
                { where: { id: id } }
            );

            const conditionUpdate = await Condition.findByPk(id);
            res.json({
                message: "Update condition success",
                data: conditionUpdate
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
        // const { reason } = req.body;
        const condition = await Condition.findByPk(id);
        if (!condition) {
            return res.status(404).json({
                message: "Condition not found"
            })
        }
        // console.log(condition)
        try {
            //hapus langsung
            await Condition.destroy({
                where: {
                    id: id
                }
            });
            // await Condition.update(
            //     {
            //         isDeleted: true,
            //         isActive: false,
            //         deletedBy: 1,
            //         deletedAt: new Date(),
            //         modifiedBy: 1
            //     },
            //     { where: { id: id } }
            // );
            res.json({
                message: "Delete condition success",
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
module.exports = ConditionController