module.exports = (sequelize, DataTypes) => {
  const UsersItem = sequelize.define('UsersItem', {
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        UsersItem.belongsTo(models.Users, {
          foreignKey: 'usersId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return UsersItem;
};