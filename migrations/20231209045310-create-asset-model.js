'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asset_models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      modelNumber: {
        type: Sequelize.STRING
      },
      manufacturerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'manufacturers',
          key: 'id'
        },
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        allowNull: false,
      },
      depreciationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'depreciations',
          key: 'id'
        },
        allowNull: true,
      },
      fieldSetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'field_sets',
          key: 'id'
        },
        allowNull: false,
      },
      notes: {
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
    await queryInterface.dropTable('asset_models');
  }
};