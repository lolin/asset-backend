'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Depreciation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Depreciation.init({
    name: DataTypes.STRING,
    term: DataTypes.INTEGER,
    floorValue: DataTypes.DOUBLE,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    tableName: 'depreciations',
    sequelize,
    modelName: 'Depreciation',
  });
  return Depreciation;
};