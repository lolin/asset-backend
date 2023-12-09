'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Manufacturer.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    supportUrl: DataTypes.STRING,
    supportPhone: DataTypes.STRING,
    supportEmail: DataTypes.STRING,
    supportAddress: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE,
    deletedBy: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    modifiedBy: DataTypes.INTEGER
  }, {
    tableName: 'manufacturers',
    sequelize,
    modelName: 'Manufacturer',
  });
  return Manufacturer;
};