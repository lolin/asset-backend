const { AssetRemoteAccess } = require("../models");

class AssetRemoteAccessController {
    static showAll = async (req, res) => {
        try {
            const data = await AssetRemoteAccess.findAll({
                order: [
                    ['id', 'ASC']
                ],
                attributes: {
                    exclude: ['createdBy', 'modifiedBy', 'deletedBy', 'createdAt', 'updatedAt', 'deletedAt']
                }
            });
            res.json({
                message: "Get data Asset Remote Accesss success",
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
            const data = await AssetRemoteAccess.findByPk(id);
            res.json({
                message: "Get data Asset Remote Accesss success",
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
        const { assetId, remoteType, remoteId, password } = req.body;
        try {
            const newAssetRemoteAccess = await AssetRemoteAccess.create({
                assetId: assetId,
                remoteType: remoteType,
                remoteId: remoteId,
                password: password,
                createdBy: 1,
                modifiedBy: 1
            });
            res.status(201).json({
                message: "Create Asset Remote Access success",
                data: newAssetRemoteAccess
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
        const { assetId, remoteType, remoteId, password } = req.body;
        // console.log(req.body)
        const remoteaccess = await AssetRemoteAccess.findByPk(id);

        if (!remoteaccess) {
            return res.status(404).json({
                message: "Asset Remote Access not found"
            })
        }
        try {
            const updateAssetRemoteAccess = await AssetRemoteAccess.update(
                {
                    assetId: assetId,
                    remoteType: remoteType,
                    remoteId: remoteId,
                    password: password,
                    modifiedBy: 1,
                },
                { where: { id: id } }
            );

            const AssetRemoteAccessUpdate = await AssetRemoteAccess.findByPk(id);
            res.json({
                message: "Update Asset Remote Access success",
                data: AssetRemoteAccessUpdate
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
        const AssetRemoteAccess = await AssetRemoteAccess.findByPk(id);
        if (!AssetRemoteAccess) {
            return res.status(404).json({
                message: "Asset Remote Access not found"
            })
        }
        try {
            await AssetRemoteAccess.update(
                {
                    isDeleted: true,
                    isActive: false,
                    deletedBy: 1,
                    deletedAt: new Date(),
                    modifiedBy: 1
                },
                { where: { id: id } }
            );
            res.json({
                message: "Delete Asset Remote Access success",
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
module.exports = AssetRemoteAccessController