'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    emailaddress: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      required: true,
      defaultValue: false,
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
  
  console.log(User === sequelize.models.User); // true 
  return User;
};