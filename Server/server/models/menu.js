'use strict';
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
    mealname: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    }
  });

  // User.associate = (models) => {
  //   // associations can be defined here
  //   User.hasMany(models.menu, {
  //     foreignKey: 'userId',
  //     as: 'menu',
  //   });
  //   User.hasMany(models.PurchasedMeal, {
  //     foreignKey: 'userId',
  //     as: 'purchasedmeal',
  //   });
  //   User.hasMany(models.Category, {
  //     foreignKey: 'userId',
  //     as: 'category',
  //   });
  // };
  
  console.log(menu === sequelize.models.menu); // true 
  return menu;
};