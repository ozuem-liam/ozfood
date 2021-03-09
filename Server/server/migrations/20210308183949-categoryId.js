module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
   await queryInterface.addColumn('menus', 'categoryId', Sequelize.STRING)
  ]),


  down: async (queryInterface, Sequelize) => {

    
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
