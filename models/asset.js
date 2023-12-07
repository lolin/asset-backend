'use strict';
const {
  Model
} = require('sequelize');
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

      Asset.hasOne(models.Category, {
        foreignKey: 'id',
        sourceKey: 'categoryId'
      })

      Asset.hasOne(models.Brand, {
        foreignKey: 'id',
        sourceKey: 'brandId'
      })
      Asset.hasOne(models.Vendor, {
        foreignKey: 'id',
        sourceKey: 'vendorId'
      })

      Asset.hasOne(models.Condition, {
        foreignKey: 'id',
        sourceKey: 'conditionId'
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Category cannot be empty"
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
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Brand cannot be empty"
        }
      }
    },
    vendorId: DataTypes.INTEGER,
    conditionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Condition cannot be empty"
        }
      }
    },
    model: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    macAddress: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
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
    deletedBy: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER
  }, {
    tableName: 'assets',
    sequelize,
    modelName: 'Asset',
  });
  return Asset;
};