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
    await queryInterface.bulkInsert('custom_fields', [
      {
        fieldSetId: 1,
        fieldName: "Proessor",
        fieldType: "text",
        helperText: "Processor",
        orderNumber: 1,
        createdBy: "Putu Indrayana",
        modifiedBy: "Putu Indrayana",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fieldSetId: 1,
        fieldName: "Graphic",
        fieldType: "text",
        helperText: "Graphic",
        orderNumber: 2,
        createdBy: "Putu Indrayana",
        modifiedBy: "Putu Indrayana",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fieldSetId: 1,
        fieldName: "Disk Type",
        fieldType: "list",
        fieldValue: "HDD SSD NVme",
        helperText: "Select Disk Type",
        orderNumber: 3,
        createdBy: "Putu Indrayana",
        modifiedBy: "Putu Indrayana",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        fieldSetId: 1,
        fieldName: "Disk Size",
        fieldType: "text",
        helperText: "500",
        orderNumber: 4,
        createdBy: "Putu Indrayana",
        modifiedBy: "Putu Indrayana",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
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
