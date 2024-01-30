'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssetRemoteAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssetRemoteAccess.init({
    assetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Asset cannot be empty"
        },
      }
    },
    remoteType: {
      type: DataTypes.STRING,
      allowNull: false,
      // 1 = Anydesk
      // 2 = Teamviwer
      // 3 = VNC
      validate: {
        notNull: {
          args: true,
          msg: "Remote Type cannot be empty"
        },
      }
    },
    remoteId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Remote Id cannot be empty"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password cannot be empty"
        },
      }
    },
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    tableName: 'remote_accesses',
    sequelize,
    modelName: 'AssetRemoteAccess',
  });
  return AssetRemoteAccess;
};