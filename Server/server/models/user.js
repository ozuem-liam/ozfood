'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
    }
  });

  // User.associate = (models) => {

  // };
  return User
};