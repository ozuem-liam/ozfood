module.exports = (sequelize, DataTypes) => {
    const PurchasedMeal = sequelize.define('PurchasedMeal', {
        menuId: DataTypes.INTEGER,

        savedPoint: {
            type: DataTypes.INTEGER,
            defaultValue: true
        },

        savedPointDate: DataTypes.DATEONLY,
        usedPointDate: DataTypes.DATEONLY,
        userId: DataTypes.INTEGER
    });
    PurchasedMeal.associate = (models) => {
        // associations can be defined here
        PurchasedMeal.belongsTo(models.menu, {
            foreignKey: 'menuId',
            onDelete: 'CASCADE',
        });
        PurchasedMeal.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
        PurchasedMeal.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            onDelete: 'CASCADE',
        });
    };
    return PurchasedMeal;
};