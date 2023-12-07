const { Vendor, Asset } = require("../models");
const { Op } = require("sequelize");
class VendorController {

    static showAll = async (req, res) => {
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
        const data = await Vendor.findAll({
            where: {
                isDeleted: false,
                isActive: true
            },
            attributes: {
                exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
            },
            include: [
                {
                    model: Asset,
                    attributes: {
                        exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
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
            message: "Get data Vendors success",
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
            const data = await Vendor.findByPk(id);
            res.json({
                message: "Get data Vendors success",
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
        const { name, phone, email, address, website, onlineShop, picName, picPhone, picEmail } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        try {
            const newVendor = await Vendor.create({
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
                createdBy: 1,
                modifiedBy: 1
            });
            res.status(201).json({
                message: "Create vendor success",
                data: newVendor
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
        const { name, phone, email, address, website, onlineShop, picName, picPhone, picEmail } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            })
        }
        const vendor = await Vendor.findByPk(id);
        if (!vendor) {
            return res.status(404).json({
                message: "Vendor not found"
            })
        }
        try {
            const updateVendor = await Vendor.update(
                {
                    name: name,
                    modifiedBy: 1,
                    phone: phone,
                    email: email,
                    address: address,
                    website: website,
                    onlineShop: onlineShop,
                    picName: picName,
                    picPhone: picPhone,
                    picEmail: picEmail
                },
                { where: { id: id } }
            );

            const vendorUpdate = await Vendor.findByPk(id);
            res.json({
                message: "Update vendor success",
                data: vendorUpdate
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
        const vendor = await Vendor.findByPk(id);
        if (!vendor) {
            return res.status(404).json({
                message: "Vendor not found"
            })
        }
        try {
            await Vendor.destroy({
                where: {
                    id: id
                }
            });
            // await Vendor.update(
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
                message: "Delete vendor success",
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
module.exports = VendorController