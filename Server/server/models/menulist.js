'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menulist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  menulist.init({
    menuname: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menulist',
  });
  return menulist;
};