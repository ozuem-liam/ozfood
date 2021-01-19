'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      menu.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      menu.hasMany(models.PurchasedMeal, {
        foreignKey: 'menuId',
        as: 'purchasedmeal',
      });
      menu.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
    };
  };
  menu.init({
    mealname: DataTypes.STRING,
    price: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    discription: DataTypes.STRING,
    review: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menu',
  });
  return menu;
};