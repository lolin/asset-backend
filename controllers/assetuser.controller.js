const { AssetUser } = require("../models");

class AssetUserController {
    static showAll = async (req, res) => {
        try {
            const data = await AssetUser.findAll({
                order: [
                    ['id', 'ASC']
                ],
                attributes: {
                    exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                }
            });
            res.json({
                message: "Get data Asset User success",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "Server error",
                serverMessage: error
            })
        }
    }
    static getDataById = async (req, res) => {
        const { id } = req.params
        try {
            const data = await AssetUser.findByPk(id);
            res.json({
                message: "Get data Asset User success",
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
        const { assetId, nik, name, departmentId } = req.body;
        try {
            const newAssetUser = await AssetUser.create({
                assetId: assetId,
                nik: nik,
                name: name,
                departmentId: departmentId,
                createdBy: userId,
                modifiedBy: userId
            });
            res.status(201).json({
                message: "Create Asset User success",
                data: newAssetUser
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
        const { assetId, nik, name, departmentId } = req.body;
        // console.log(req.body)
        const remoteaccess = await AssetUser.findByPk(id);

        if (!remoteaccess) {
            return res.status(404).json({
                message: "Asset User not found"
            })
        }
        try {
            const updateAssetUser = await AssetUser.update(
                {
                    assetId: assetId,
                    nik: nik,
                    name: name,
                    departmentId: departmentId,
                    modifiedBy: userId,
                },
                { where: { id: id } }
            );

            const AssetUserUpdate = await AssetUser.findByPk(id);
            res.json({
                message: "Update Asset User success",
                data: AssetUserUpdate
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
        const AssetUser = await AssetUser.findByPk(id);
        if (!AssetUser) {
            return res.status(404).json({
                message: "Asset User not found"
            })
        }
        try {
            await AssetUser.update(
                {
                    isDeleted: true,
                    isActive: false,
                    deletedBy: userId,
                    deletedAt: new Date(),
                    modifiedBy: userId
                },
                { where: { id: id } }
            );
            res.json({
                message: "Delete Asset User success",
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
module.exports = AssetUserController