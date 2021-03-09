
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            reqsuire: true,
        }
    });
    Category.associate = (models) => {
        // associations can be defined here
        Category.belongsTo(models.User, {
            foreignKe: 'userId',
            onDelete: 'CASCADE',
        });
        Category.hasMany(models.menu, {
            foreignKey: 'categoryId',
            as: 'menu',
        });
        Category.hasMany(models.PurchasedMeal, {
            foreignKey: 'categoryId',
            as: 'purchasedmeal',
        });
    };
    return Category;
};