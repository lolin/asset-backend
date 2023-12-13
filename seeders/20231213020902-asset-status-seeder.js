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
    await queryInterface.bulkInsert('asset_statuses', [
      {
        name: 'Available',
        description: 'Available asset ready to distribute',
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Assigned',
        description: 'Asset that already assigned to user',
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maintenance',
        description: 'Asset under maintenance',
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Unavailable',
        description: 'Unavailable asset (broken, lost, etc)',
        createdBy: 1,
        modifiedBy: 1,
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
