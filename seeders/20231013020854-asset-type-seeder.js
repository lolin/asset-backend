'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('asset_types', [
      {
        name: 'Asset',
        description: 'Asset',
        createdBy: 'Putu Indrayana',
        modifiedBy: 'Putu Indrayana',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accessory',
        description: 'Accessory asset',
        createdBy: 'Putu Indrayana',
        modifiedBy: 'Putu Indrayana',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Component',
        description: 'Component asset',
        createdBy: 'Putu Indrayana',
        modifiedBy: 'Putu Indrayana',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Consumable',
        description: 'Consumable asset',
        createdBy: 'Putu Indrayana',
        modifiedBy: 'Putu Indrayana',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'License',
        description: 'License asset',
        createdBy: 'Putu Indrayana',
        modifiedBy: 'Putu Indrayana',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
