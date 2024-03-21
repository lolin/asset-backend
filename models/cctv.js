'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cctv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cctv.init({
    alias: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    verificationCode: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    installedOn: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cctv',
  });
  return Cctv;
};