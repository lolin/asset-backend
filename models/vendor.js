'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vendor.hasMany(models.Asset, {
        foreignKey: 'vendorId',
      })
    }
  }
  Vendor.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    website: DataTypes.STRING,
    onlineShop: DataTypes.STRING,
    picName: DataTypes.STRING,
    picPhone: DataTypes.STRING,
    picEmail: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    deletedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER
  }, {
    tableName: 'vendors',
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};