'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
  

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.renameColumn('Menus', 'description', 'discription')
    ]
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
