'use strict';
const {
  Model
} = require('sequelize');
const AssetHasCustomField = require('./assetHasCustomField');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asset.hasOne(models.Department, {
        foreignKey: 'id',
        sourceKey: 'departmentId'
      })
      Asset.hasOne(models.AssetModel, {
        foreignKey: 'id',
        sourceKey: 'assetModelId'
      })
      Asset.hasOne(models.Vendor, {
        foreignKey: 'id',
        sourceKey: 'vendorId'
      })
      Asset.hasOne(models.AssetStatus, {
        foreignKey: 'id',
        sourceKey: 'assetStatusId'
      })
      Asset.hasOne(models.Condition, {
        foreignKey: 'id',
        sourceKey: 'conditionId'
      })
      Asset.hasMany(models.AssetHasCustomField, {
        foreignKey: 'assetId',
        sourceKey: 'id'
      })
    }
  }
  Asset.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        }
      }
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Department cannot be empty"
        }
      }
    },
    assetModelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Model cannot be empty"
        }
      }
    },
    vendorId: DataTypes.INTEGER,
    assetStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Status cannot be empty"
        }
      }
    },
    conditionId: DataTypes.INTEGER,
    serialNumber: DataTypes.STRING,
    macAddress: DataTypes.STRING,
    assetDetails: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Details asset cannot be empty"
        }
      }
    },
    price: DataTypes.DOUBLE,
    purchaseDate: DataTypes.DATE,
    warantyPeriod: DataTypes.DATE,
    isDecomissioned: DataTypes.BOOLEAN,
    decommissionedDate: DataTypes.DATE,
    decommissionedReason: DataTypes.STRING,
    decommissionedBy: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE,
    deletedBy: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    tableName: 'assets',
    sequelize,
    modelName: 'Asset',

  });
  return Asset;
};