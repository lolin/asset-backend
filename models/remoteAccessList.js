'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RemoteAccessList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RemoteAccessList.belongsTo(models.Asset, {
        foreignKey: 'assetId'
      })
    }
  }
  RemoteAccessList.init({
    assetId: DataTypes.NUMBER,
    alias: DataTypes.STRING,
    remoteId: DataTypes.STRING,
    remoteUser: DataTypes.STRING,
    remotePassword: DataTypes.STRING,
    remoteSource: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    modifiedBy: DataTypes.STRING
  }, {
    tableName: 'remote_access_list',
    sequelize,
    modelName: 'RemoteAccessList',
  });
  return RemoteAccessList;
};