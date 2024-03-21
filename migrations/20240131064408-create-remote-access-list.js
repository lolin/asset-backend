'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('remote_access_list', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'assets',
          key: 'id'
        },
        allowNull: true,
      },
      alias: {
        type: Sequelize.STRING
      },
      remoteId: {
        type: Sequelize.STRING
      },
      remoteUser: {
        type: Sequelize.STRING
      },
      remotePassword: {
        type: Sequelize.STRING,
      },
      remoteSource: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.STRING
      },
      modifiedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('remote_access_list');
  }
};