'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => 
  Promise.all ([
    queryInterface.renameColumn('menus', 'categoryId', 'categoryid')
  ]),
  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.renameColumn('menus', 'categoryid', 'categoryId')
    ]
    
  }
};
