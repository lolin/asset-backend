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
    // - Very Good
    // - Minor Defects
    // - Maintenance Required
    // - Require Renewal
    // - Asset Unserviceable
    // 1. Only normal maintenance required
    // 2. Minor maintenance required (5%)
    // 3. Significant maintenance required (10-20%)
    // 4. Significant renewel/upgrade required (20-40%)
    // 5. Over 50% of asset requires replacement
    await queryInterface.bulkInsert('conditions', [
      {
        name: 'Very Good',
        description: 'Only normal maintenance required',
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Minor Defects',
        description: 'Minor maintenance required (5%)',
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maintenance Required',
        description: 'Significant maintenance required (10-20%)',
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Require Renewal',
        description: 'Significant renewel/upgrade required (20-40%)',
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asset Unserviceable',
        description: 'Over 50% of asset requires replacement',
        createdBy: 1,
        modifiedBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
