'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('custom_fields', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fieldSetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'field_sets',
          key: 'id'
        },
        allowNull: false,
      },
      fieldName: {
        type: Sequelize.STRING
      },
      fieldType: {
        type: Sequelize.STRING
      },
      fieldValue: {
        type: Sequelize.STRING
      },
      fieldFormat: {
        type: Sequelize.STRING
      },
      helperText: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      modifiedBy: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('custom_fields');
  }
};